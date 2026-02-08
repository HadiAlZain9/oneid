export type RootStackParamList = {
  QRScan: undefined;
   CreateWorkAccount: undefined;
  CreatePersonalAccount: undefined;
  CreateBusinessAccount: undefined;
  AccountTypeSelection: {
    qrCode: string;
    qrDocId: string;
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

