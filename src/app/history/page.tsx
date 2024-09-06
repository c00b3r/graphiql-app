'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Loader from '@/components/Loader/Loader';
import HistoryModule from '@/components/history/History';
import NoHistory from '@/components/history/NoHistory';
import './page.css';
import { getCookie } from 'cookies-next';

export default function HistoryPage() {
  const router = useRouter();
  const [savedState, setSavedState] = useState<string | null | false>(null);
  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    const storageStatus = typeof window !== 'undefined' ? window.localStorage.getItem('history_data') : false;
    setSavedState(storageStatus);
  }, []);

  useEffect(() => {
    const getLoginStatus = getCookie('loginStatus');
    if (!getLoginStatus) {
      router.push('/');
    } else {
      setLoginStatus(true);
    }
  }, []);

  return <>{loginStatus ? savedState ? <HistoryModule /> : <NoHistory /> : <Loader />}</>;
}
