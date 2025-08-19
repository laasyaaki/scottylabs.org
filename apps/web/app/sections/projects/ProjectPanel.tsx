import { tsr } from "../../utils/tsr";
import css from "./ProjectPanel.module.css";
export default function ProjectPanel({ repoId }: { repoId: number }) {
  const lastUpdated = tsr.lastUpdated.useQuery({
    queryKey: [`last-updated-${repoId}`],
    queryData: { params: { repoId: repoId.toString() } },
  });
  return <div>{lastUpdated.data?.body?.updatedDate}</div>;
}
