"use client";

import React, { useState } from "react";
import { useAppDispatch, useAppState } from "./appContext";

const LoginViews = {
  SIGN_UP: "sign_up",
  SIGN_IN: "sign_in",
  REGISTERING: "registering",
  AUTHENTICATING: "authenticating",
  MINTING: "minting",
  MINTED: "minted",
  CREATING_SESSION: "creating_session",
  SESSION_CREATED: "session_created",
  ERROR: "error",
};

export default function Login() {
  const { currentPKP } = useAppState();
  const dispatch = useAppDispatch();

  const [view, setView] = useState(LoginViews.SIGN_UP);
  const [errorMsg, setErrorMsg] = useState(null);

  const [username, setUsername] = useState("");
  const [pkp, setPKP] = useState(currentPKP);

  async function authThenGetSessionSigs(event: React.MouseEvent) {
    event.preventDefault();
  }

  switch (view) {
    case LoginViews.SIGN_UP:
      return (
        <>
          <h1 className="text-4xl font-bold text-white">Sign Up</h1>
        </>
      );
    case LoginViews.SIGN_IN:
      return (
        <>
          <h1 className="text-4xl font-bold text-white">Sign In</h1>
        </>
      );
    case LoginViews.REGISTERING:
      return (
        <>
          <h1 className="text-4xl font-bold text-white">Registering</h1>
        </>
      );
    case LoginViews.AUTHENTICATING:
      return (
        <>
          <h1 className="text-4xl font-bold text-white">Authenticating</h1>
        </>
      );
    case LoginViews.MINTING:
      return (
        <>
          <h1 className="text-4xl font-bold text-white">Minting</h1>
        </>
      );
    case LoginViews.MINTED:
      return (
        <>
          <h1 className="text-4xl font-bold text-white">Minted</h1>
        </>
      );
    case LoginViews.CREATING_SESSION:
      return (
        <>
          <h1 className="text-4xl font-bold text-white">Creating Session</h1>
        </>
      );
    case LoginViews.SESSION_CREATED:
      return (
        <>
          <h1 className="text-4xl font-bold text-white">Session Created</h1>
        </>
      );
    case LoginViews.ERROR:
      return (
        <>
          <h1 className="text-4xl font-bold text-white">Error</h1>
        </>
      );
  }
}
