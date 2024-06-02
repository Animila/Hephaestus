import Register from '@/components/Register';
import { useContext, useEffect } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/router";

export default function RegisterPage() {
  const { checkAuth } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    checkAuth().then(res => {
      if(res) {
        router.push('/admin')
      }
    })
  }, [])
  return <Register />;
}
