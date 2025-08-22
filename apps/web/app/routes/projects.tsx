import { Header } from "../sections/projects/Header";
import {
  BocchiIcon,
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
      <ProjectPanel
        repoIds={[461295694, 28149130]}
        description={
          "CMUEats is your one-stop-shop for finding out what campus dining locations are open right now."
        }
        imageURLs={getAllImageLinksInAssetDirectory("cmu-courses")}
        technologiesUsed={[TypescriptIcon, ReactIcon, BocchiIcon]}
        name="CMU Eats"
        url="https://cmueats.com/"
      />
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
