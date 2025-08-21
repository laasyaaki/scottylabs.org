import { Header } from "../sections/projects/Header";
import {
  JavascriptIcon,
  MongoDBIcon,
  NextJSIcon,
  ReactIcon,
  TailwindIcon,
  TypescriptIcon,
} from "../sections/projects/Icons";
import ProjectPanel from "../sections/projects/ProjectPanel";
import { getAllImageLinksInAssetDirectory } from "../utils/files";

export default function Component() {
  return (
    <>
      <Header />
      <ProjectPanel
        repoIds={[461300766]}
        description={
          "Bringing together course information, schedules and FCE data, it makes it possible for CMU students to plan their semesters and browse for courses."
        }
        imageURLs={getAllImageLinksInAssetDirectory("cmu-courses")}
        technologiesUsed={[
          JavascriptIcon,
          TypescriptIcon,
          ReactIcon,
          NextJSIcon,
          TailwindIcon,
          MongoDBIcon,
        ]}
        name="CMU Courses"
        url="https://cmucourses.com/"
      />
    </>
  );
}
