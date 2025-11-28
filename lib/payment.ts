// Google Pay integration helpers

export interface PaymentRequest {
  amount: number;
  currency: string;
  description: string;
}

export function getGooglePayConfig() {
  return {
    environment: process.env.NODE_ENV === 'production' ? 'PRODUCTION' : 'TEST',
    merchantInfo: {
      merchantId: process.env.NEXT_PUBLIC_GOOGLE_PAY_MERCHANT_ID || '',
      merchantName: process.env.NEXT_PUBLIC_GOOGLE_PAY_MERCHANT_NAME || "WE'RE SL",
    },
    paymentDataRequest: {
      allowedPaymentMethods: ['CARD', 'TOKENIZED_CARD'],
      cardRequirements: {
        allowedCardNetworks: ['VISA', 'MASTERCARD'],
      },
    },
  };
}

export function formatPaymentAmount(amount: number): string {
  return (amount / 100).toFixed(2);
}

