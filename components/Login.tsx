"use client";

import { useState } from "react";
import {
  registerWithWebAuthn,
  authenticateWithWebAuthn,
} from "../lib/webauthn";
import { AuthMethod } from "@lit-protocol/types";

export default function Login() {
  const [username, setUsername] = useState("");
  const [authenticationState, setAuthenticationState] = useState(
    AuthenticationState.Initial,
  );
  const [passkey, setPasskey] = useState("");

  return (
    <>
      (if authenticationState === AuthenticationState.Initial)
      {
        <>
          <input
            type="text"
            placeholder="Ex Beep Boop"
            onChange={(e) => setUsername(e.target.value)}
            className="w-full max-w-md rounded-md border border-stone-300 text-sm text-stone-900 placeholder-stone-300 focus:border-stone-500 focus:outline-none focus:ring-stone-500 dark:border-stone-600 dark:bg-black dark:text-white dark:placeholder-stone-700"
          />
          <button
            className="rounded-lg border border-black bg-black px-4 py-1.5 text-sm font-medium text-white transition-all hover:bg-white hover:text-black active:bg-stone-100 dark:border-stone-700 dark:hover:border-stone-200 dark:hover:bg-black dark:hover:text-white dark:active:bg-stone-800"
            onClick={async () => {
              const publicKey = await registerWithWebAuthn(username);
              console.log(publicKey);
              setPasskey((publicKey as string) || "");
              setAuthenticationState(AuthenticationState.PasskeyCreated);
            }}
            disabled={username == ""}
          >
            Create Passkey
          </button>
        </>
      }
      (else if authenticationState === AuthenticationState.PasskeyCreated)
      {
        <>
          <h1
            onLoad={async () => {
              const auth = authenticateWithWebAuthn();
              auth.then((result) => {
                console.log(result);
                setAuthenticationState(AuthenticationState.PasskeyVerified);
              });
            }}
          >
            Authenticating...
          </h1>
          <h2>
            Your publickey is: <span>{passkey}</span>
          </h2>
        </>
      }
    </>
  );
}

const AuthenticationState = {
  Initial: "Initial",
  PasskeyCreated: "PasskeyCreated",
  PasskeyVerified: "PasskeyVerified",
};
