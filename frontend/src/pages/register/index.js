import { useContext, useEffect } from "react";
import { Auth_context } from "@/contexts/auth_context";
import { useRouter } from "next/router";
import { Register } from "@/components/register";

export default function RegisterPage() {
  const { checkAuth } = useContext(Auth_context);
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
