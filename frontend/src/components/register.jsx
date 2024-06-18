import Link from 'next/link';
import { LogoSite } from "@/assets/LogoSite";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { isMobile } from "react-device-detect";
import InputMask from 'react-input-mask'

export const Register = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const [errors, setErrors] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { register } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1000));

   try {
     // Запрос на регистрацию к вашему API
     const response = await register(name, surname, email, phone)
     console.log('data ', response)

     if (response.success) {
       router.push({
         pathname: '/confirm',
         query: { email }
       });
     } else {
       setErrors(response.errors)
     }
   } catch (err) {
     alert('Непредвиденная ошибка. Обратитесь к тех поддержку')
   } finally {
     setLoading(false)
   }
  };
  return (
    <div className="flex h-screen sm:flex-col md:flex-row">
      <div className="sm:hidden md:flex sm:py-[30px] md:flex-1 bg-blue text-white flex-col justify-center items-center">
        <h1 className="text-3xl md:text-5xl font-bold">Создайте свой аккаунт</h1>
        <p className="mt-4 md:text-xl"><Link href="/login" className="underline">или войдите</Link></p>
      </div>
      <div className="flex-1 flex flex-col justify-center items-center sm:bg-blue md:bg-white">
        <div className="sm:flex md:hidden flex-col items-center sm:mb-[15px]">
          <h1 className="text-3xl md:text-5xl font-bold text-center text-white">Создайте свой аккаунт</h1>
          <p className="mt-3 md:text-xl text-white"><Link href="/login" className="underline">или войдите</Link></p>
        </div>
        <LogoSite width={100} height={100} lineColor={isMobile ? "white" : "black"} />
        <form onSubmit={handleSubmit} className="w-2/3 mt-8">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Имя"
              className={`w-full px-4 py-2 border rounded-md ${errors.includes('first_name') && 'border-red-600'}`}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {errors.includes('first_name') && <span className="text-red-600 text-[16px]">
            Телефон
            </span>}
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Фамилия"
              className={`w-full px-4 py-2 border rounded-md ${errors.includes('last_name') && 'border-red-600'}`}
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
            {errors.includes('last_name') && <span className="text-red-600 text-[16px]">
            Телефон
            </span>}
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="E-mail"
              className={`w-full px-4 py-2 border rounded-md ${errors.includes('email') && 'border-red-600'}`}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.includes('email') && <span className="text-red-600 text-[16px]">
            Почта уже используется
            </span>}
          </div>
          <div className="mb-4">
            <InputMask
              type="tel"
              placeholder="Телефон"
              mask="+7 (999) 999-99-99"
              className={`w-full px-4 py-2 border rounded-md ${errors.includes('phone') && 'border-red-600'}`}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {errors.includes('phone') && <span className="text-red-600 text-[16px]">
            Телефон
            </span>}
          </div>

          <div className="mb-4">
            <button
              disabled={email.trim().toLowerCase() === '' || name.trim().toLowerCase() === '' || surname.trim().toLowerCase() === '' || phone.trim().toLowerCase() === '' || loading}
              type="submit" className="w-full px-4 py-2 sm:font-bold sm:border-2 sm:border-white md:bg-blue text-white rounded-md flex justify-center items-center">
              {loading ? (
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
              ) : 'Подтвердить аккаунт'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
