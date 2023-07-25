import Card from "@/components/home/card";
import Balancer from "react-wrap-balancer";
import { Github, Twitter } from "@/components/shared/icons";
import ComponentGrid from "@/components/home/component-grid";

export default function HomePage() {
  return (
    <>
      <div className="z-10 w-full max-w-xl px-5 xl:px-0">
        <h1
          className="animate-fade-up font-display bg-gradient-to-br from-black to-stone-500 bg-clip-text text-center text-4xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-sm md:text-7xl md:leading-[5rem]"
          style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
        >
          <Balancer>Launch Mobile Apps Fast</Balancer>
        </h1>
        <p
          className="animate-fade-up mt-6 text-center text-gray-500 opacity-0 md:text-xl"
          style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
        >
          <Balancer>Plug and play mobile tooling</Balancer>
        </p>
        <div
          className="animate-fade-up mx-auto mt-6 flex items-center justify-center space-x-5 opacity-0"
          style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
        >
          <a
            href="https://twitter.com/snowballtools"
            target="_blank"
            rel="noreferrer"
            className="roup flex max-w-fit items-center justify-center space-x-2 rounded-full border border-blue-300 bg-blue-100 px-7 py-2 shadow-md transition-colors hover:border-blue-800"
          >
            <Twitter className="h-5 w-5 text-[#1d9bf0]" />
          </a>
          <a
            className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-gray-300 bg-white px-5 py-2 text-sm text-gray-600 shadow-md transition-colors hover:border-gray-800"
            href="https://github.com/snowball-tools"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github />
          </a>
        </div>
      </div>
    </>
  );
}

const features = [];
