import { lazy, Suspense } from "react";
import Hero from "./Hero";

const About = lazy(() => import("./About"));
const Projects = lazy(() => import("./Projects"));
const ToolsTech = lazy(() => import("./ToolsAndTech"));
const Education = lazy(() => import("./Education"));
const ResumeViewer = lazy(() => import("./Resume"));
const Contact = lazy(() => import("./Contacts"));

const Home = () => {
  return (
    <>
      <Hero />
      <Suspense fallback={<div className="container-prose py-16 text-muted">Loading…</div>}>
        <About />
        <Projects />
        <ToolsTech />
        <Education />
        <ResumeViewer />
        <Contact />
      </Suspense>
    </>
  );
};
export default Home;