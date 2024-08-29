'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { SingUp } from '@/components/SignUp/SingUp';

export default function SingUpPage() {
  const router = useRouter();
  const { isAuth } = useAuth();

  useEffect(() => {
    if (isAuth) {
      router.push('/');
    }
  }, [isAuth, router]);

  return (
    <main className="main">
      <div className="container">
        Sing Up Page
        <SingUp />
        <p>
          Already have an account? <Link href="/login">Log in</Link>
        </p>
      </div>
    </main>
  );
}
