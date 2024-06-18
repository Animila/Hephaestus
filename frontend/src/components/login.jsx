import React, { useContext, useState } from "react";
import Link from 'next/link';
import { LogoSite } from "@/assets/LogoSite";
import { useRouter } from "next/router";
import { AuthContext } from "@/contexts/AuthContext";
import { isMobile } from "react-device-detect";

export const Login = () => {
  const [email, setEmail] = useState('');
  const { login } = useContext(AuthContext);
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Добавляем задержку в 1 секунду
    await new Promise(resolve => setTimeout(resolve, 1000));

    const success = await login(email);
    setLoading(false);
    if (success === 201) {
      router.push({
        pathname: '/confirm',
        query: { email }
      });
      return;
    }
    if (success === 404) {
      setError('Почта не найдена');
      return;
    }
    setError('Неизвестная ошибка');
  };

  return (
    <div className="flex h-screen sm:flex-col md:flex-row">
      <div className="sm:hidden md:flex sm:py-[30px] md:flex-1 bg-blue text-white flex-col justify-center items-center">
        <h1 className="text-3xl md:text-5xl font-bold text-center">Войдите в свой аккаунт</h1>
        <p className="mt-4 md:text-xl"><Link href="/register" className="underline">или создайте новый</Link></p>
      </div>

      <div className="flex-1 flex flex-col justify-center items-center sm:bg-blue md:bg-white">
        <div className="sm:flex md:hidden flex-col items-center sm:mb-[15px]">
          <h1 className="text-3xl md:text-5xl font-bold text-center text-white">Войдите в свой аккаунт</h1>
          <p className="mt-3 md:text-xl text-white"><Link href="/register" className="underline">или создайте новый</Link></p>
        </div>
        <LogoSite width={100} height={100} lineColor={isMobile ? "white" : "black"} />
        <form onSubmit={handleSubmit} className="w-2/3 mt-8">
          <div className="mb-4">
            <input
              type="email"
              placeholder="E-mail"
              className={`w-full px-4 py-2 border rounded-md ${error && 'border-red-600'}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
            {error !== '' && <span className="text-red-600 text-[16px]">
              {error}
            </span>}
          </div>
          <div className="mb-4">
            <button
              disabled={email.trim().toLowerCase() === '' || loading}
              type="submit"
              className="w-full px-4 py-2 sm:font-bold sm:border-2 sm:border-white md:bg-blue text-white rounded-md flex justify-center items-center"
            >
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
              ) : 'Войти'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
