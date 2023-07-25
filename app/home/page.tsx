"use client";

import { useEffect, useState } from "react";
import { browserSupportsWebAuthn } from "@simplewebauthn/browser";
import Home from "@/components/Home";
import Login from "@/components/Login";

export default function HomePage() {
  // hardcoded for now
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isWebAuthnSupported, setIsWebAuthnSupported] = useState(true);
  useEffect(() => {
    const supported =
      browserSupportsWebAuthn() && !navigator.userAgent.includes("Firefox");
    setIsWebAuthnSupported(supported);
  }, []);

  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-10 bg-black">
      <h1 className="text-4xl font-bold text-white">Igloo Tools</h1>
      {isAuthenticated ? <Home /> : <Login />}
    </div>
  );
}
