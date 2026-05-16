import { AuthUser } from './user.type';

declare module '@inertiajs/react' {
  interface PageProps {
    auth: AuthUser;
    flash?: {
      success?: string;
      error?: string;
    };
  }
}