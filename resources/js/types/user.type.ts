export type UserRole = "seller" | "collector" | "shop";

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole | null;           // Allow null before role is chosen
  photo?: string | null;
  email_verified_at?: string | null;
  created_at?: string;
  updated_at?: string;
  phone?: string | null;
  address?: string | null;
  city?: string | null;
  state?: string | null;
  postal_code?: string | null;
  country?: string | null;
  is_active?: boolean;
  is_verified?: boolean;
  avatar_url?: string | null;
  bio?: string | null;
  rating?: number;
  total_transactions?: number;
}

export interface AuthUser {
  user: User | null;
}