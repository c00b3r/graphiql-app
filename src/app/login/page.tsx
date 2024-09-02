'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { Login } from '@/components/Login/Login';
import Loader from '@/components/Loader/Loader';

export default function LoginPage() {
  const router = useRouter();
  const isAuth = useSelector((state: RootState) => state.user.isAuthenticated);

  useEffect(() => {
    if (isAuth) {
      router.push('/');
    }
  }, [isAuth, router]);

  if (isAuth) {
    return <Loader />;
  }

  return (
    <main className="main">
      <div className="container">
        Sign In Page
        <Login />
        <p>
          Not Registered Yet? <Link href="/signup">Create an account</Link>
        </p>
      </div>
    </main>
  );
}
