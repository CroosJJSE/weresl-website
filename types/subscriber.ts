export interface Subscriber {
  id: string;
  email: string;
  subscribedAt: Date | string;
  active: boolean;
}

