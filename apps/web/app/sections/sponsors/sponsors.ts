import accenture from "../../assets/sponsors-page/sponsors/accenture.svg";
import agentuity from "../../assets/sponsors-page/sponsors/agentuity.svg";
import balysany from "../../assets/sponsors-page/sponsors/balysany.svg";
import citadel from "../../assets/sponsors-page/sponsors/citadel.svg";
import coderabbit from "../../assets/sponsors-page/sponsors/coderabbit.svg";
import commvault from "../../assets/sponsors-page/sponsors/commvault.svg";
import deshaw from "../../assets/sponsors-page/sponsors/deshaw.svg";
import fly from "../../assets/sponsors-page/sponsors/fly.svg";
import hrt from "../../assets/sponsors-page/sponsors/hrt.svg";
import janeStreet from "../../assets/sponsors-page/sponsors/janestreet.svg";
import modal from "../../assets/sponsors-page/sponsors/modal.svg";
import optiver from "../../assets/sponsors-page/sponsors/optiver.svg";
import scale from "../../assets/sponsors-page/sponsors/scale.svg";
import snl from "../../assets/sponsors-page/sponsors/snl.svg";
import visa from "../../assets/sponsors-page/sponsors/visa.svg";

export type SponsorTypes = "lowest" | "partner" | "premier";

export const sponsors = [
  {
    imageUrl: accenture,
    type: "partner",
    websiteUrl: "https://www.accenture.com",
  },
  {
    imageUrl: agentuity,
    type: "partner",
    websiteUrl: "https://agentuity.com/",
  },
  {
    imageUrl: balysany,
    type: "lowest",
    websiteUrl: "https://www.bamfunds.com/",
  },
  {
    imageUrl: citadel,
    type: "partner",
    websiteUrl: "https://www.citadel.com/",
  },
  {
    imageUrl: coderabbit,
    type: "premier",
    websiteUrl: "https://www.coderabbit.ai/",
  },
  {
    imageUrl: commvault,
    type: "partner",
    websiteUrl: "https://www.commvault.com/",
  },
  {
    imageUrl: deshaw,
    type: "partner",
    websiteUrl: "https://www.deshaw.com/",
  },
  {
    imageUrl: fly,
    type: "partner",
    websiteUrl: "https://fly.io/",
  },
  {
    imageUrl: hrt,
    type: "partner",
    websiteUrl: "https://www.hudsonrivertrading.com/",
  },
  {
    imageUrl: janeStreet,
    type: "lowest",
    websiteUrl: "https://www.janestreet.com/",
  },
  {
    imageUrl: modal,
    type: "partner",
    websiteUrl: "https://modal.com/",
  },
  {
    imageUrl: optiver,
    type: "partner",
    websiteUrl: "https://optiver.com/",
  },
  {
    imageUrl: scale,
    type: "partner",
    websiteUrl: "https://scale.com/",
  },
  {
    imageUrl: snl,
    type: "partner",
    websiteUrl: "https://www.sandia.gov/",
  },
  {
    imageUrl: visa,
    type: "premier",
    websiteUrl: "https://visa.com/",
  },
] satisfies { imageUrl: string; type: SponsorTypes; websiteUrl: string }[];
