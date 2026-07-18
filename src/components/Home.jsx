import { lazy, Suspense } from "react";
import Hero from "./Hero";

const About = lazy(() => import("./About"));
const Projects = lazy(() => import("./Projects"));
const ToolsTech = lazy(() => import("./ToolsAndTech"));
const Education = lazy(() => import("./Education"));
const FAQ = lazy(() => import("./FAQ"));
const Contact = lazy(() => import("./Contacts"));

const Home = ({ onSelectProject }) => {
  return (
    <>
      <Hero />
      <Suspense fallback={<div className="container-prose py-16 text-muted">Loading…</div>}>
        <About />
        <Projects onSelectProject={onSelectProject} />
        <ToolsTech />
        <Education />
        <FAQ />
        <Contact />
      </Suspense>
    </>
  );
};
export default Home;