export type RootStackParamList = {
  QRScan: undefined;
  AccountTypeSelection: {
    qrCode: string;
    qrDocId: string;
  };
  CreateAccount: {
    qrCode: string;
    qrDocId: string;
    accountType: string;
  };
  HomeTabs: {
    userId: string;
  };
};
export type HomeTabsParamList = {
  Home: { userId: string } | undefined;
  Search: { userId: string } | undefined;
  Scan: { userId: string } | undefined;
  MyContacts: { userId: string } | undefined;
  Settings: { userId: string } | undefined;
};