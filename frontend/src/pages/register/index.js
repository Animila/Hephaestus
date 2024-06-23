import { useEffect } from "react";
import { useAuth } from "@/contexts/auth_context";
import { useRouter } from "next/router";
import { Register } from "@/components/register";

export default function RegisterPage() {
  const { checkAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    checkAuth().then(res => {
      if(res) {
        router.push('/admin/projects')
      }
    })
  }, [])
  return <Register />;
}
