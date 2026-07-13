'use client';

import { useRouter } from 'next/navigation';
import { IoIosLogOut } from 'react-icons/io';
import { createClient } from '@/supabase/libs/client';
import { Button } from '@/components/ui/button';

export default function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <Button variant={'destructive'} onClick={handleLogout}>
      <IoIosLogOut />
      Cerrar Sesión
    </Button>
  );
}
