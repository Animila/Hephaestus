import { useAuth } from "@/contexts/auth_context";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Login } from "@/components/login";

export default function LoginPage() {
  const { checkAuth } = useAuth();
  const router = useRouter();

  useEffect(() => {
    checkAuth().then(res => {
      if(res) {
        router.push('/admin/projects')
      }
    }).catch(() => {})
  }, [])
  return <Login />;
}
