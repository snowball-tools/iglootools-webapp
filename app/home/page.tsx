import { InlineSnippet } from "@/components/form/domain-configuration";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-10 bg-black">
      <form className="flex flex-col items-center justify-center space-y-10">
        <div className="flex flex-col items-center justify-center space-y-10">
          <Image
            src="/images/logo.png"
            alt="Picture of the author"
            width={200}
            height={200}
          />
          <h1 className="text-4xl text-white">Welcome to the</h1>
          <h1 className="text-4xl text-white">Domain Configuration</h1>
        </div>
      </form>
    </div>
  );
}
