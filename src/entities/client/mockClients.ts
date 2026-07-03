import { Client } from './types';

export const mockClients: Client[] = [
  {
    id: 'client-1',
    name: 'Тестов А.А.',
    kind: 'direct',
    accountId: '1',
  },
  {
    id: 'client-2',
    name: 'Пример Б.Б.',
    kind: 'direct',
    accountId: '2',
  },
  {
    id: 'client-3',
    name: 'Образец В.В.',
    kind: 'trusted',
    accountIds: ['3', '4', '5'],
  },
];

export function getClientById(clientId: string): Client | undefined {
  return mockClients.find((client) => client.id === clientId);
}

export function getClientByAccountId(accountId: string): Client | undefined {
  return mockClients.find((client) => {
    if (client.kind === 'direct') {
      return client.accountId === accountId;
    }

    return client.accountIds.includes(accountId);
  });
}
