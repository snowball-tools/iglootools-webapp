import { LitAuthClient, WebAuthnProvider } from "@lit-protocol/lit-auth-client";
import { ProviderType } from "@lit-protocol/constants";
import { AuthMethod } from "@lit-protocol/types";

// to do: "static" func -> ts object

export const DEFAULT_EXP = new Date(
  Date.now() + 1000 * 60 * 60 * 24 * 7,
).toISOString();

const litAuthClient = new LitAuthClient({
  litRelayConfig: {
    relayApiKey: "{{ LIT_RELAY_API_KEY }}",
  },
});

litAuthClient.initProvider(ProviderType.WebAuthn);

export async function authenticateWithWebAuthn() {
  const provider = litAuthClient.getProvider(
    ProviderType.WebAuthn,
  ) as WebAuthnProvider;

  const authMethod = await provider.authenticate();
  return authMethod as AuthMethod;
}
