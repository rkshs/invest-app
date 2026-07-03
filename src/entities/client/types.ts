export type DirectClient = {
  id: string;
  name: string;
  kind: 'direct';
  accountId: string;
};

export type TrustedClient = {
  id: string;
  name: string;
  kind: 'trusted';
  accountIds: string[];
};

export type Client = DirectClient | TrustedClient;

export function isTrustedClient(client: Client): client is TrustedClient {
  return client.kind === 'trusted';
}

export function getClientAccountIds(client: Client): string[] {
  if (isTrustedClient(client)) {
    return client.accountIds;
  }

  return [client.accountId];
}
