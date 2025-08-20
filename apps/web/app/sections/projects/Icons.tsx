import flutterIcon from "../../assets/icons/apps/Flutter.svg";
import googleMapsIcon from "../../assets/icons/apps/google-maps.png";
import javascriptIcon from "../../assets/icons/apps/JavaScript.svg";
import mongoDBIcon from "../../assets/icons/apps/MongoDB.svg";
import nextJSIcon from "../../assets/icons/apps/Next.js.svg";
import reactIcon from "../../assets/icons/apps/React.svg";
import tailwindIcon from "../../assets/icons/apps/Tailwind CSS.svg";
import typescriptIcon from "../../assets/icons/apps/TypeScript.svg";
import vercelIcon from "../../assets/icons/apps/Vercel.svg";
export interface Icon {
  url: string;
  name: string;
}
export const FlutterIcon: Icon = {
  url: flutterIcon,
  name: "Flutter",
};

export const GoogleMapsIcon: Icon = {
  url: googleMapsIcon,
  name: "Google Maps",
};
export const JavascriptIcon: Icon = {
  url: javascriptIcon,
  name: "JavaScript",
};
export const MongoDBIcon: Icon = {
  url: mongoDBIcon,
  name: "Mongo DB",
};
export const NextJSIcon: Icon = {
  url: nextJSIcon,
  name: "Next.JS",
};
export const ReactIcon: Icon = {
  url: reactIcon,
  name: "React",
};
export const TailwindIcon: Icon = {
  url: tailwindIcon,
  name: "TailwindCSS",
};
export const TypescriptIcon: Icon = {
  url: typescriptIcon,
  name: "TypeScript",
};
export const VercelIcon: Icon = {
  url: vercelIcon,
  name: "Vercel",
};
