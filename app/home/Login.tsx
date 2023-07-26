"use client";

import React, { useState } from "react";
import { useAppDispatch, useAppState } from "./appContext";
import {
  DEFAULT_EXP,
  authenticate,
  authenticateWithWebAuthn,
  fetchPKPs,
  getSessionSigsForWebAuthn,
  registerWithWebAuthn,
} from "@/lib/webauthn";
import { AUTHENTICATED } from "./actions";
import { initialState } from "./constants";

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

  async function createPKPWithWebAuthn(event: React.MouseEvent) {
    event.preventDefault();

    setView(LoginViews.REGISTERING);

    const publicKey = await registerWithWebAuthn(username);

    if (publicKey) {
      setPKP(publicKey);
    }

    setView(LoginViews.AUTHENTICATING);

    const auth = await authenticateWithWebAuthn();

    if (auth) {
      setView(LoginViews.MINTED);
    }
  }

  // todo:
  async function authThenGetSessionSigs(event: React.MouseEvent) {
    event.preventDefault();

    setView(LoginViews.AUTHENTICATING);

    try {
      const authData = await authenticateWithWebAuthn();

      let pkpToAuthWith = pkp;
      if (!pkpToAuthWith) {
        const pkps = await fetchPKPs(authData);
        if (pkps.length === 0) {
          throw new Error(
            "No PKPs found for this passkey. Please register a new passkey to mint a new PKP.",
          );
        } else {
          pkpToAuthWith = pkps[0];
        }
      }

      setView(LoginViews.CREATING_SESSION);

      if (pkpToAuthWith) {
        const authData = await authenticate();
        const sessionSigs = await getSessionSigsForWebAuthn(
          pkpToAuthWith,
          authData,
        );

        console.log("sessionSigs", sessionSigs);
        
        setView(LoginViews.SESSION_CREATED);

        dispatch({
          type: AUTHENTICATED,
          payload: {
            ...initialState,
            isAuthenticated: true,
            currentUsername: username,
            currentPKP: pkpToAuthWith,
            sessionSigs: sessionSigs,
            sessionExpiration: DEFAULT_EXP,
          },
        });
      }
    } catch (e: Error | any) {
      console.error(e);
      setErrorMsg(e.message);
      setView(LoginViews.ERROR);
    }
  }

  switch (view) {
    case LoginViews.SIGN_UP:
      return (
        <>
          <h1 className="text-4xl font-bold text-white">Sign Up</h1>
          <form className="flex flex-col space-y-4">
            <label className="text-white">Username</label>
            <input
              className="rounded-md border border-gray-300"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button
              className="rounded-md bg-gray-300"
              type="submit"
              onClick={createPKPWithWebAuthn}
            >
              Sign Up
            </button>
            <button
              className="rounded-md bg-gray-300"
              type="button"
              onClick={() => setView(LoginViews.SIGN_IN)}
            >
              Sign In
            </button>
          </form>
        </>
      );
    case LoginViews.SIGN_IN:
      return (
        <>
          <h1 className="text-4xl font-bold text-white">Sign In</h1>
          <button
            className="w-full border border-indigo-500 bg-indigo-600 bg-opacity-20 px-6 py-3 text-base text-indigo-300 hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={authenticateWithWebAuthn}
          >
            Sign In with WebAuthn
          </button>
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
          <h2 className="text-1xl font-bold text-white">${pkp}</h2>
          <button
            className="w-full border border-indigo-500 bg-indigo-600 bg-opacity-20 px-6 py-3 text-base text-indigo-300 hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            onClick={authThenGetSessionSigs}
          >
            Get SessionSig
          </button>
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
          <p className="text-white">{errorMsg}</p>
        </>
      );
  }
}