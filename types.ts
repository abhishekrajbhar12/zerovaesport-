
export enum MatchType {
  FULL_MAP = 'Full Map',
  ONE_V_ONE = '1v1',
  TWO_V_TWO = '2v2',
  FOUR_V_FOUR = '4v4'
}

export enum MapName {
  BERMUDA = 'Bermuda',
  KALAHARI = 'Kalahari',
  PURGATORY = 'Purgatory'
}

export interface User {
  id: string;
  name: string;
  phone: string;
  ffUid: string;
  walletBalance: number;
  referralCode: string;
  referralCount: number;
  role: 'user' | 'admin';
  profilePic?: string;
  isBanned?: boolean;
}

export interface Tournament {
  id: string;
  title: string;
  description: string;
  matchType: MatchType;
  map: MapName;
  entryFee: number;
  perKillPrize: number;
  prizePool: number;
  slots: number;
  joinedSlots: number;
  startTime: string; // ISO string
  roomId?: string;
  roomPassword?: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  image: string;
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  type: 'deposit' | 'withdrawal' | 'entry_fee' | 'winning' | 'referral';
  status: 'pending' | 'success' | 'failed';
  timestamp: string;
  method?: string;
}

export interface AppSettings {
  whatsappNumber: string;
  referralReward: number;
  minWithdrawal: number;
  maxDailyWithdrawal: number;
  minDeposit: number;
  qrCodeEnabled: boolean;
  gatewayEnabled: boolean;
  qrCodeImage: string;
  paymentGatewayLink: string;
  upiId: string;
  depositEnabled: boolean;
}
