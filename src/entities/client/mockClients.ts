import { Client } from './types';

export const mockClients: Client[] = [
  {
    id: 'client-1',
    name: 'Тестов А.А.',
    accountId: '1',
  },
  {
    id: 'client-2',
    name: 'Анна К.',
    accountId: '2',
  },
  {
    id: 'client-5',
    name: 'Дмитрий В.',
    accountId: '1',
  },
  {
    id: 'client-3',
    name: 'Образец В.В.',
    accountId: '3',
  },
];

export function getClientById(clientId: string): Client | undefined {
  return mockClients.find((client) => client.id === clientId);
}
