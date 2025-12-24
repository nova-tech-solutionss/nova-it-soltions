// Django response format
export interface DjangoResponse<T> {
  success?: boolean;
  results?: T[];
  count?: number;
  next?: string | null;
  previous?: string | null;
}

export interface Message {
  id: string;
  conversation?: string | null;
  from_number: string;
  to_number: string;
  body: string | null;
  direction: 'inbound' | 'outbound';
  telnyx_message_id: string | null;
  created_at: string;
}

export interface Conversation {
  id: string;
  customer_number: string;
  last_message: string | null;
  status: 'open' | 'closed';
  created_at: string;
  updated_at: string;
  unread_count?: number;
  message_count?: number;
}

export interface User {
  id: string | number;
  email: string;
  username?: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}