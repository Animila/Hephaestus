import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import Login from "@/components/login";

export default function LoginPage() {
  const { checkAuth } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    checkAuth().then(res => {
      if(res) {
        router.push('/admin')
      }
    })
  }, [])
  return <Login />;
}
