import { getAccountForClientChat } from '../../../entities/client/getAccountForClientChat';
import { Account } from '../../../types';

const CLIENT_TRADER_CHAT_PREFIX = 'chat-client-trader-';

const OPERATION_REQUEST_PATTERN =
  /купить|продать|заявк|сделк|операц|ордер|исполн|перевод|обмен|покуп|продаж|куплю|продам|buy|sell/i;

export function isClientTraderChat(chatId: string): boolean {
  return chatId.startsWith(CLIENT_TRADER_CHAT_PREFIX);
}

function buildOperationExecutedReplies(account: Account): string[] {
  return [
    `Операция исполнена по счёту CPID ${account.cpid}. Заявка принята, статус: исполнена.`,
    `Поручение выполнено по счёту CPID ${account.cpid}. Позиция обновлена, детали — в отчёте по счёту.`,
    `Сделка проведена по счёту CPID ${account.cpid}. Средства списаны, исполнение подтверждено.`,
  ];
}

export function getOperationExecutedReply(
  chatId: string,
  pickReply: (poolKey: string, replies: string[]) => string,
): string | null {
  const account = getAccountForClientChat(chatId);

  if (!account || !isClientTraderChat(chatId)) {
    return null;
  }

  return pickReply(`${chatId}:operation`, buildOperationExecutedReplies(account));
}

export function shouldReplyWithOperationConfirmation(
  chatId: string,
  message: string,
): boolean {
  if (!isClientTraderChat(chatId)) {
    return false;
  }

  return OPERATION_REQUEST_PATTERN.test(message.trim());
}
