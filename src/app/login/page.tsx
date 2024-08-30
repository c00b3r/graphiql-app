import Link from 'next/link';
import { Login } from '@/components/Login/Login';

export default function LoginPage() {
  return (
    <main className="main">
      <div className="container">
        Sing In Page
        <Login />
        <p>
          Not Registered Yet? <Link href="/signup">Create an account</Link>
        </p>
      </div>
    </main>
  );
}
