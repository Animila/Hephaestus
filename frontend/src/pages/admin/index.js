// pages/admin.js
import React, { useContext, useEffect } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/router";

const Admin = () => {
  const { checkAuth } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    checkAuth().then(res => {
      if(!res) {
        router.push('/login')
      }
    })
  }, [])

  return (
    <div>
      <h1>Админка</h1>
      {/* Ваш контент админки */}
    </div>
  );
};

export default Admin;
