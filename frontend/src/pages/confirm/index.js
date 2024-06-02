// pages/confirm.js
import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { AuthContext } from '@/contexts/AuthContext';

const Confirm = () => {
  const [code, setCode] = useState('');
  const { confirm } = useContext(AuthContext);
  const router = useRouter();
  const { email } = router.query;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await confirm(email, code);
    if (success) {
      router.push('/admin');
    } else {
      alert('Ошибка подтверждения. Попробуйте снова.');
    }
  };

  return (
    <div className="flex h-screen sm:flex-col md:flex-row">
      <div className="sm:py-[30px] md:flex-1 bg-blue text-white flex flex-col justify-center items-center">
        <h1 className="text-3xl md:text-5xl font-bold">Введите код подтверждения</h1>
      </div>
      <div className="flex-1 flex flex-col justify-center items-center bg-white">
        <form onSubmit={handleSubmit} className="w-2/3 mt-8">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Код"
              className="w-full px-4 py-2 border rounded-md"
              value={code}
              onChange={(e) => setCode(e.target.value)} />
          </div>
          <div className="mb-4">
            <button type="submit" className="w-full px-4 py-2 bg-blue text-white rounded-md">Подтвердить</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Confirm;
