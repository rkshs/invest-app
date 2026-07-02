export type AuthStackParamList = {
  RoleSelect: undefined;
};

export type ClientStackParamList = {
  Home: undefined;
  Account: { accountId: string };
  Markets: undefined;
  ChatDetail: { chatId: string };
  Settings: undefined;
};

export type TraderStackParamList = {
  TraderChatList: undefined;
  TraderChatDetail: { chatId: string };
  TraderClientPortfolio: { accountId: string; clientName: string };
  TraderSettings: undefined;
};
