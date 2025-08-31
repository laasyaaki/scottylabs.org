#!/usr/bin/env python3
# IMPORTANT! DO NOT TRUST THIS CODE!!! This was generated in one go with GPT-5
# seems to have rotated some of the images lmao
"""
resize_images.py — Batch-resize images to a maximum width (default 1000px).

Usage examples:
  # Resize into an "resized" subfolder (default), keeping structure
  python resize_images.py /path/to/images --max-width 1000

  # Do it in-place (OVERWRITES original files)
  python resize_images.py /path/to/images --in-place

  # Recurse into subfolders and write to a custom output directory
  python resize_images.py /path/to/images --recursive --out /tmp/out --max-width 1200

Dependencies:
  pip install pillow
"""
from __future__ import annotations

import argparse
import concurrent.futures
import os
import shutil
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable, Tuple

from PIL import Image, ImageOps

# Pillow safety: Avoid DecompressionBombWarning for large images if desired
Image.MAX_IMAGE_PIXELS = None

SUPPORTED_EXTS = {'.jpg', '.jpeg', '.png', '.webp', '.bmp', '.tiff', '.tif'}

@dataclass
class TaskResult:
    src: Path
    dst: Path | None
    skipped: bool
    reason: str | None
    resized_from: Tuple[int, int] | None
    resized_to: Tuple[int, int] | None
    error: str | None


def iter_image_files(root: Path, recursive: bool) -> Iterable[Path]:
    if recursive:
        yield from (p for p in root.rglob("*") if p.is_file() and p.suffix.lower() in SUPPORTED_EXTS)
    else:
        yield from (p for p in root.iterdir() if p.is_file() and p.suffix.lower() in SUPPORTED_EXTS)


def calc_new_size(w: int, h: int, max_w: int) -> Tuple[int, int]:
    if w <= max_w:
        return w, h
    scale = max_w / float(w)
    return int(round(w * scale)), int(round(h * scale))


def ensure_parent_dir(path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)


def save_image(img: Image.Image, out_path: Path, orig_format: str | None, exif_bytes: bytes | None, quality: int) -> None:
    fmt = (orig_format or out_path.suffix.replace('.', '')).upper()
    # Normalize common format strings
    if fmt == 'JPG':
        fmt = 'JPEG'

    save_kwargs = {}
    if fmt in ('JPEG', 'WEBP'):
        save_kwargs['quality'] = quality
    if fmt == 'JPEG':
        save_kwargs.update(dict(optimize=True, progressive=True))
        # JPEG doesn't support alpha; flatten if needed
        if img.mode in ('RGBA', 'LA'):
            bg = Image.new('RGB', img.size, (255, 255, 255))
            bg.paste(img, mask=img.split()[-1])
            img = bg
        elif img.mode not in ('RGB', 'L'):
            img = img.convert('RGB')
    elif fmt == 'PNG':
        save_kwargs.update(dict(optimize=True))
    # Preserve EXIF when possible
    if exif_bytes and fmt in ('JPEG', 'TIFF'):
        save_kwargs['exif'] = exif_bytes

    img.save(out_path, fmt, **save_kwargs)


def process_one(src: Path, base_in: Path, out_dir: Path | None, max_width: int, in_place: bool, quality: int) -> TaskResult:
    try:
        with Image.open(src) as im0:
            # Apply EXIF orientation
            im = ImageOps.exif_transpose(im0)
            w, h = im.size
            new_w, new_h = calc_new_size(w, h, max_width)

            # Decide output path
            if in_place:
                dst = src
            else:
                rel = src.relative_to(base_in)
                dst = (out_dir / rel) if out_dir else (base_in / "resized" / rel)

            if new_w == w and not in_place:
                # Width already <= max_width; just copy if writing to out_dir
                ensure_parent_dir(dst)
                shutil.copy2(src, dst)
                return TaskResult(src, dst, skipped=True, reason=f"already <= {max_width}px", resized_from=None, resized_to=None, error=None)

            if new_w == w and in_place:
                return TaskResult(src, None, skipped=True, reason=f"already <= {max_width}px", resized_from=None, resized_to=None, error=None)

            # Resize
            resized = im.resize((new_w, new_h), resample=Image.LANCZOS)

            ensure_parent_dir(dst)
            save_image(
                resized,
                dst,
                orig_format=im0.format,
                exif_bytes=im0.info.get('exif'),
                quality=quality
            )
            return TaskResult(src, dst, skipped=False, reason=None, resized_from=(w, h), resized_to=(new_w, new_h), error=None)

    except Exception as e:
        return TaskResult(src, None, skipped=False, reason=None, resized_from=None, resized_to=None, error=str(e))


def main(argv: list[str] | None = None) -> int:
    p = argparse.ArgumentParser(description="Batch-resize images to max width (default 1000px).")
    p.add_argument("input_dir", type=Path, help="Directory containing images")
    p.add_argument("--out", type=Path, default=None, help="Output directory (default: <input_dir>/resized). Ignored if --in-place")
    p.add_argument("--max-width", type=int, default=1000, help="Maximum width in pixels (default: 1000)")
    p.add_argument("--recursive", action="store_true", help="Process subfolders recursively")
    p.add_argument("--in-place", action="store_true", help="Overwrite original files IN PLACE (dangerous).")
    p.add_argument("--quality", type=int, default=85, help="Quality for JPEG/WebP (default: 85)")
    p.add_argument("--workers", type=int, default=0, help="Number of worker threads (default: CPU count). 0 means auto.")
    args = p.parse_args(argv)

    input_dir: Path = args.input_dir.expanduser().resolve()
    if not input_dir.is_dir():
        print(f"[error] Input directory not found: {input_dir}", file=sys.stderr)
        return 2

    out_dir: Path | None = None
    if not args.in_place:
        out_dir = (args.out or (input_dir / "resized")).resolve()
        out_dir.mkdir(parents=True, exist_ok=True)

    paths = list(iter_image_files(input_dir, args.recursive))
    if not paths:
        print("[info] No supported images found.")
        return 0

    total = len(paths)
    print(f"[info] Found {total} image(s). Processing with max width {args.max_width}px"
          f"{' in-place' if args.in_place else f' -> {out_dir}'} ...")

    workers = (os.cpu_count() or 4) if args.workers == 0 else max(1, args.workers)
    resized_n = skipped_n = error_n = 0

    with concurrent.futures.ThreadPoolExecutor(max_workers=workers) as ex:
        futs = [
            ex.submit(process_one, pth, input_dir, out_dir, args.max_width, args.in_place, args.quality)
            for pth in paths
        ]
        for fut in concurrent.futures.as_completed(futs):
            res: TaskResult = fut.result()
            if res.error:
                error_n += 1
                print(f"[error] {res.src}: {res.error}", file=sys.stderr)
            elif res.skipped:
                skipped_n += 1
                if res.dst:
                    print(f"[skip]  {res.src.name} (<= {args.max_width}px) -> copied")
                else:
                    print(f"[skip]  {res.src.name} (<= {args.max_width}px)")
            else:
                resized_n += 1
                before = f"{res.resized_from[0]}x{res.resized_from[1]}"
                after = f"{res.resized_to[0]}x{res.resized_to[1]}"
                if args.in_place:
                    print(f"[ok]    {res.src.name}: {before} -> {after} (in-place)")
                else:
                    print(f"[ok]    {res.src.name}: {before} -> {after} -> {res.dst}")

    print(f"\n[done] resized: {resized_n}, skipped: {skipped_n}, errors: {error_n}, total: {total}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
