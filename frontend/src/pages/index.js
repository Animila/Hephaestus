import { Inter } from "next/font/google";
import React, { useContext } from "react";
import Image from "next/image";
import { LogoSite } from "@/assets/LogoSite";
import Link from "next/link";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { isAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  const handleTryFreeClick = () => {
    if (isAuthenticated) {
      router.push('/admin');
    } else {
      router.push('/login');
    }
  };

  return (
    <main className={`${inter.className}`}>
      <header className='md:mx-[100px] sm:mx-[10px] md:h-[100px] flex items-center justify-between sm:flex-col md:flex-row sm:gap-[20px]'>
        <div className='flex gap-[10px] items-center'>
          <LogoSite height={45} width={45}/>
          <span className={'font-bold text-[30px]'}>ГЕФЕСТ</span>
        </div>
        <button onClick={handleTryFreeClick}
          className='flex px-[30px] py-[15px] text-white bg-button rounded-[20px] text-[20px] font-bold hover:bg-light_blue hover:text-blue'>
          Попробовать бесплатно
        </button>
      </header>
      <section className='md:mx-[100px] sm:mx-[10px] flex md:flex-row justify-between items-center sm:mt-[40px] md:mt-[100px] sm:flex-col-reverse'>
        <div>
          <h1
            className='text-text sm:text-[30px] sm:leading-[30px] sm:text-center md:text-start sm:mt-[10px] md:mt-0 md:text-[50px] md:leading-[70px] font-bold max-w-[800px]'>
            Сервис для создания рекомендательных алгоритмов для вас
          </h1>
          <button onClick={handleTryFreeClick}
            className='sm:mt-[30px] md:mt-[100px] flex justify-center items-center sm:w-full md:w-auto sm:py-[15px] md:px-[50px] md:py-[20px] text-white bg-button rounded-[20px] sm:text-[20px] md:text-[30px] font-bold hover:bg-light_blue hover:text-text'>
            Попробовать бесплатно
          </button>
        </div>
        <LogoSite height={350} width={350}/>
      </section>
      <section className='md:mx-[100px] sm:mx-[10px] grid sm:grid-cols-1 md:grid-cols-2 gap-[50px] mt-[100px]'>
        <div className='flex flex-col gap-[20px] px-[50px] py-[50px] border-[1px] border-text rounded-[25px]'>
          <h2 className='text-[30px] leading-[40px] font-bold text-text'>Кто мы?</h2>
          <p className='text-[20px] sm:leading-[30px] md:leading-[40px] text-text'>Наша платформа позволяет стартапам и
            компаниям быстро и легко создавать рекомендательные модели, не нанимая специалистов и не тратя средства на
            инфраструктуру</p>
        </div>
        <div className='flex flex-col gap-[20px] px-[50px] py-[50px] border-[1px] border-text rounded-[25px]'>
          <h2 className='text-[30px] leading-[40px] font-bold text-text'>Особенности</h2>
          <ul className='text-[20px] sm:leading-[30px] md:leading-[40px] list-disc text-text'>
            <li>Наш сервис интуитивно понятен и не требует технических знаний.</li>
            <li>Получите готовый код для Python и JavaScript</li>
            <li>Настройте параметры модели за считанные минуты</li>
          </ul>
        </div>
      </section>
      <section className='md:mx-[100px] sm:mx-[10px] md:mt-[100px] sm:mt-[50px]'>
        <h2
          className='text-text md:text-[50px] md:leading-[28px] md:font-normal sm:font-bold sm:text-center md:text-start sm:text-[25px] sm:leading-[38px] tracking-[-5%]'>Как
          происходит создание алгоритма</h2>
        <div className='grid md:grid-cols-2 sm:grid-cols-1 md:mt-[70px] sm:mt-[40px] gap-[50px]'>
          <div className='flex flex-col bg-blue rounded-[25px] gap-[20px] px-[50px] py-[50px] text-white'>
            <span className='text-[30px] leading-[40px] font-bold'>01</span>
            <h3 className='text-[30px] leading-[40px] font-bold'>Загрузите ваши данные в формате CSV</h3>
            <p className='text-[20px] leading-[30px]'>Перед тем как загрузить данные, проведите первоначальную анализ и
              выборку, оставив столбцы, по которым будет происходит дальнейшие рекомендации</p>
          </div>
          <div className="flex flex-col bg-blue rounded-[25px] gap-[20px] px-[50px] py-[50px] text-white">
            <span className='text-[30px] leading-[40px] font-bold'>02</span>
            <h3 className='text-[30px] leading-[40px] font-bold'>Загрузите форму для добавления и настройте
              параметры</h3>
            <p className='text-[20px] leading-[30px]'>Для разных тарифов, мы предоставляем различные варианты генерации
              и моделей.</p>
          </div>
          <div className='flex flex-col bg-blue rounded-[25px] gap-[20px] px-[50px] py-[50px] text-white'>
            <span className='text-[30px] leading-[40px] font-bold'>03</span>
            <h3 className='text-[30px] leading-[40px] font-bold'>Получите готовую модель и код для внедрения</h3>
            <p className='text-[20px] leading-[30px]'>Получите готовую модель через ссылку (или файл*), а также скрипты
              с инструкциями для добавления кода в
              платформу. На данный момент мы поддерживаем JS и Python, но вскоре добавим дополнительные платформы
            </p>
            <span className='text-[15px] leading-[50px]'>*- для некоторых тарифов</span>
          </div>
        </div>
      </section>
      <section className='md:mx-[100px] sm:mx-[10px] md:mt-[100px] sm:mt-[50px]'>
        <h2 className='text-text md:text-[50px] md:leading-[70px] sm:text-[35px] sm:leading-[38px] font-bold sm:text-center md:text-start'>Тарифные планы</h2>
        <div className='grid grid-cols-1 gap-[50px] mt-[50px]'>
          <div
            className='flex sm:flex-col md:flex-row gap-[14px] px-[50px] py-[30px] border-[1px] border-text rounded-[25px] bg-blue justify-between'>
            <div>
              <h3 className="text-[50px] leading-[60px] font-bold text-button">Профи</h3>
              <ul className="text-[20px] sm:leading-[30px] md:leading-[40px] text-white mt-[15px]">
                <li>- Полный доступ к функциям</li>
                <li>- Приоритетная поддержка</li>
                <li>- Расширенные настройки модели</li>
                <li>- Увеличенные лимиты</li>
              </ul>
            </div>
            <div className="flex justify-between flex-col items-end ">
              <div className='flex flex-col items-center'>
                <p className="text-[40px] leading-[27px] font-bold text-white">Стоимость:</p>
                <p className="text-[30px] leading-[27px] font-bold text-white mt-[20px]">500 рублей/мес</p>
                <p className="text-[20px] leading-[27px] font-bold text-[#CBCBCB]">(в месяц)</p>
              </div>
              <button
                className="mt-[10px] px-[100px] py-[10px] text-white bg-button rounded-[20px] text-[20px] font-bold hover:bg-light_blue hover:text-blue">Купить
              </button>
            </div>
          </div>
          <div
            className='flex sm:flex-col md:flex-row gap-[14px] px-[50px] py-[30px] border-[1px] border-text rounded-[25px] justify-between'>
            <div>
              <h3 className="text-[50px] leading-[60px] font-bold text-button">Новичок</h3>
              <ul className="text-[20px] sm:leading-[30px] md:leading-[40px] text-blue mt-[15px]">
                <li>- Базовый доступ к функциям</li>
                <li>- Стандартная техподдержка</li>
                <li>- До 2 моделей в месяц</li>
                <li>- Ограничение на количество данных</li>
              </ul>
            </div>
            <div className="flex justify-between flex-col items-end ">
              <div className='flex flex-col items-center'>
                <p className="text-[40px] leading-[27px] font-bold text-text">Стоимость:</p>
                <p className="text-[30px] leading-[27px] font-bold text-blue mt-[20px]">Бесплатно</p>
                <p className="text-[20px] leading-[27px] font-bold text-[#CBCBCB]">(в месяц)</p>
              </div>
              <button
                className="mt-[10px] px-[100px] py-[10px] rounded-[20px] bg-light_blue text-[20px] font-bold text-blue hover:bg-blue hover:text-white">Купить
              </button>
            </div>
          </div>
          <div
            className='flex sm:flex-col md:flex-row gap-[14px] px-[50px] py-[30px] border-[1px] border-text rounded-[25px] justify-between'>
            <div>
              <h3 className="text-[50px] leading-[60px] font-bold text-button">Компания</h3>
              <ul className="text-[20px] sm:leading-[30px] md:leading-[40px] text-blue mt-[15px]">
                <li>- Расширенные возможности</li>
                <li>- Персональная техподдержка 24/7</li>
                <li>- Индивидуальные настройки</li>
                <li>- Неограниченные лимиты и данные</li>
              </ul>
            </div>
            <div className="flex justify-between flex-col items-end ">
              <div className='flex flex-col items-center'>
                <p className="text-[40px] leading-[27px] font-bold text-text">Стоимость:</p>
                <p className="text-[30px] leading-[27px] font-bold text-blue mt-[20px]">1000 рублей</p>
                <p className="text-[20px] leading-[27px] font-bold text-[#CBCBCB]">(в месяц)</p>
              </div>
              <button
                className="mt-[10px] px-[100px] py-[10px] rounded-[20px] bg-light_blue text-[20px] font-bold text-blue hover:bg-blue hover:text-white">Купить
              </button>
            </div>
          </div>
        </div>
      </section>
      <footer className='md:px-[100px] sm:px-[10px] bg-light_blue w-full py-[40px] mt-[100px] justify-between flex md:flex-row sm:flex-col sm:items-center'>
        <div className='flex items-center text-[40px] font-bold tracking-[-5%] gap-[10px] '>
          <LogoSite lineColor={'#1E3A8A'} height={45} width={45}/>
          <span className='text-blue'>Гефест</span>
        </div>
        <div className='flex flex-col items-end text-blue sm:mt-[40px] md:mt-0'>
          <span>Контакты:</span>
          <span>Email: <a href='mailto:khristoforov-i@mail.ru'>khristoforov-i@mail.ru</a></span>
          <span className='mt-[22px]'>2024, "Все права защищены."</span>
        </div>
      </footer>
    </main>
  );
}
