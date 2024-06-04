// pages/confirm.js
import React, { useState, useContext, useEffect, useRef } from "react";
import { useRouter } from 'next/router';
import { AuthContext } from '@/contexts/AuthContext';

const ConfirmPage = () => {
  const [code, setCode] = useState(new Array(6).fill(""));
  const { confirm, checkAuth, login } = useContext(AuthContext);
  const router = useRouter();
  const { email } = router.query;
  const [timer, setTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const inputRefs = useRef([]);

  useEffect(() => {
    checkAuth().then(res => {
      if(res) {
        router.push('/admin')
      }
    })

    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(countdown);
          setIsResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, [])

  const handleChange = (element, index) => {
    const value = element.value;
    if (/^[0-9]$/.test(value) || value === "") {
      const newCode = [...code];
      console.log(newCode)
      newCode[index] = value;
      console.log(newCode)
      setCode(newCode);

      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }

      if (index === 5 && value) {
        handleSubmit(newCode);
      }
    }
  };

  const handleSubmit = async (code) => {
   try {
     const codeString = code.join("");
     console.log(code)
     console.log(codeString)
     const success = await confirm(email, codeString);
     console.log('34567', success)
     if (success) {
       router.push('/admin');
     }
   } catch (error) {
     alert('Ошибка подтверждения. Попробуйте снова.');
     setCode(new Array(6).fill(""))
   }
  };

  const handleResend = () => {
    setTimer(60);
    setIsResendDisabled(true);
    // Добавьте здесь вызов функции для повторной отправки кода
    login(email)
  };

  return (
    <div className="flex h-screen sm:flex-col md:flex-row">
      <div className="sm:py-[30px] md:flex-1 bg-blue text-white flex flex-col justify-center items-center">
        <h1 className="text-3xl md:text-5xl font-bold text-center">Введите код подтверждения</h1>
      </div>
      <div className="flex-1 flex flex-col justify-center items-center bg-white">
        <form onSubmit={(e) => e.preventDefault()} className="w-2/3 mt-8">
          <div className="flex justify-between mb-4">
            {code.map((_, index) => (
              <input
                key={index}
                ref={el => inputRefs.current[index] = el}
                type="text"
                maxLength="1"
                className="w-full py-2 border rounded-md text-center mx-1"
                value={code[index]}
                onChange={(e) => handleChange(e.target, index)}
              />
            ))}
          </div>
          <div className="mb-4">
            <button type="submit" onClick={() => handleSubmit(code)}
                    className="w-full px-4 py-2 bg-blue text-white rounded-md">Подтвердить
            </button>
          </div>
          <div className='mt-[20px]'>
            <button
              type="button"
              onClick={handleResend}
              className={`w-full px-4 py-2 bg-gray-400 text-white rounded-md ${isResendDisabled ? 'cursor-not-allowed' : ''}`}
              disabled={isResendDisabled}
            >
              {isResendDisabled ? `Повторная отправка через ${timer} секунд` : "Отправить снова код"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ConfirmPage;
