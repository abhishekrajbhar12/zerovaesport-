
import { MatchType, MapName, Tournament, AppSettings } from './types';

export const INITIAL_APP_SETTINGS: AppSettings = {
  whatsappNumber: '919876543210',
  referralReward: 1.00,
  minWithdrawal: 30,
  maxDailyWithdrawal: 1000,
  minDeposit: 10,
  qrCodeEnabled: true,
  gatewayEnabled: true,
  qrCodeImage: 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=upi://pay?pa=demo@upi&pn=FFTourney&am=0',
  paymentGatewayLink: 'https://pages.razorpay.com/fftourney',
  upiId: 'demo@upi',
  depositEnabled: true
};

export const MOCK_TOURNAMENTS: Tournament[] = [
  {
    id: '1',
    title: 'Sunday Morning Clash',
    description: 'Get 5rs per kill. High stakes match!',
    matchType: MatchType.FULL_MAP,
    map: MapName.BERMUDA,
    entryFee: 30,
    perKillPrize: 5,
    prizePool: 1500,
    slots: 48,
    joinedSlots: 12,
    startTime: new Date(Date.now() + 3600000 * 2).toISOString(),
    status: 'upcoming',
    image: 'https://picsum.photos/seed/ff1/800/400'
  },
  {
    id: '2',
    title: 'Elite 1v1 Battle',
    description: 'Win or Lose. Final prize for winner only.',
    matchType: MatchType.ONE_V_ONE,
    map: MapName.KALAHARI,
    entryFee: 50,
    perKillPrize: 0,
    prizePool: 80,
    slots: 2,
    joinedSlots: 1,
    startTime: new Date(Date.now() + 3600000 * 5).toISOString(),
    status: 'upcoming',
    image: 'https://picsum.photos/seed/ff2/800/400'
  }
];
