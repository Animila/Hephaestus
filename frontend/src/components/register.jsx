import Link from 'next/link';
import { LogoSite } from "@/assets/LogoSite";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";

const Register = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Запрос на регистрацию к вашему API
    const response = await fetch('/api/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ first_name: name, last_name: surname, email, phone, role_id: 2 }),
    });

    if (response.ok) {
      router.push({
        pathname: '/confirm',
        query: { email }
      });
    }
  };
  return (
    <div className="flex h-screen sm:flex-col md:flex-row">
      <div className="sm:py-[30px] md:flex-1 bg-blue text-white flex flex-col justify-center items-center">
        <h1 className="text-3xl md:text-5xl font-bold">Создайте свой аккаунт</h1>
        <p className="mt-4 md:text-xl"><Link href="/login" className="underline">или войдите</Link></p>
      </div>
      <div className="flex-1 flex flex-col justify-center items-center bg-white">
        <LogoSite width={100} height={100} />
        <form onSubmit={handleSubmit} className="w-2/3 mt-8">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Имя"
              className="w-full px-4 py-2 border rounded-md"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Фамилия"
              className="w-full px-4 py-2 border rounded-md"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="E-mail"
              className="w-full px-4 py-2 border rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <input
              type="tel"
              placeholder="Телефон"
              className="w-full px-4 py-2 border rounded-md"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <button type="submit" className="w-full px-4 py-2 bg-blue text-white rounded-md">Подтвердить аккаунт
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
