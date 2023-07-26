import { LitAuthClient, WebAuthnProvider } from "@lit-protocol/lit-auth-client";
import { ProviderType } from "@lit-protocol/constants";
import { AuthMethod } from "@lit-protocol/types";

const litAuthClient = new LitAuthClient({
  litRelayConfig: {
    relayApiKey: "{{ LIT_RELAY_API_KEY }}",
  },
});

litAuthClient.initProvider(ProviderType.WebAuthn);

const provider = litAuthClient.getProvider(
  ProviderType.WebAuthn,
) as WebAuthnProvider;

export async function registerWithWebAuthn(username: string) {
  const options = await provider.register(username);

  const txHash = await provider.verifyAndMintPKPThroughRelayer(options);
  const response = await provider.relay.pollRequestUntilTerminalState(txHash);

  return response.pkpPublicKey;
}

export async function authenticateWithWebAuthn() {
  const authMethod = await provider.authenticate();
  return authMethod as AuthMethod;
}
