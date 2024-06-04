import React, { useContext, useState } from "react";
import Link from 'next/link';
import { LogoSite } from "@/assets/LogoSite";
import { useRouter } from "next/router";
import { AuthContext } from "@/contexts/AuthContext";

const Login = () => {
  const [email, setEmail] = useState('');
  const { login } = useContext(AuthContext);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email)
    if (success) {
      router.push({
        pathname: '/confirm',
        query: { email }
      });
    } else {
      alert('Ошибка входа. Попробуйте снова.');
    }
  };

  return (
    <div className="flex h-screen sm:flex-col md:flex-row">
      <div className="sm:py-[30px] md:flex-1 bg-blue text-white flex flex-col justify-center items-center">
        <h1 className="text-3xl md:text-5xl font-bold text-center">Войдите в свой аккаунт</h1>
        <p className="mt-4 md:text-xl"><Link href="/register" className="underline">или создайте новый</Link></p>
      </div>
      <div className="flex-1 flex flex-col justify-center items-center bg-white">
        <LogoSite width={100} height={100} />
        <form onSubmit={handleSubmit} className="w-2/3 mt-8">
          <div className="mb-4">
            <input
              type="email"
              placeholder="E-mail"
              className="w-full px-4 py-2 border rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-4">
            <button type="submit" className="w-full px-4 py-2 bg-blue text-white rounded-md">Войти</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
