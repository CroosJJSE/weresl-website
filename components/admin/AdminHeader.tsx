'use client';

import { User } from 'firebase/auth';
import { signOut } from '@/lib/firebase/auth';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

export function AdminHeader({ user }: { user: User }) {
  const router = useRouter();

  async function handleSignOut() {
    await signOut();
    router.push('/admin/login');
  }

  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="flex items-center justify-between px-8 py-4">
        <h1 className="text-2xl font-heading font-bold text-primary">WE'RE SL Admin</h1>
        <div className="flex items-center space-x-4">
          <span className="text-sm text-foreground/70">{user.email}</span>
          <Button variant="ghost" size="sm" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  );
}

