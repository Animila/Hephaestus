// components/AdminLayout.js
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { LogoSite } from "@/assets/LogoSite";
import Link from "next/link";
import { AuthService } from "@/services/AuthService";

const AdminLayout = ({ children }) => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-[#DBE4FF] min-h-screen flex flex-col">
      <header className="bg-blue sm:m-0 md:mx-[100px] md:mt-[50px] text-white sm:rounded-none md:rounded-[20px] sm:px-[10px] py-[20px] md:px-[20px]">
        <div className="sm:w-full md:w-auto md:mx-auto flex items-center justify-between">
          <div className="flex items-center md:gap-[62px]">
            <div className="flex gap-[10px] items-center">
              <LogoSite height={40} width={40} lineColor={"white"} />
              <span className={"font-bold text-[30px]"}>ГЕФЕСТ</span>
            </div>
            <nav className="hidden md:flex gap-[20px]">
              <Link href="/admin/projects">Проекты</Link>
              <Link href="/admin/models">Модели</Link>
              <Link href="/admin/support">Техподдержка</Link>
            </nav>
          </div>
          <div className="flex items-center">
            <button onClick={() => {
              AuthService.logout();
              router.reload();
            }} className="hidden md:block bg-blue-700 px-4 py-2 rounded-md">
              Выйти
            </button>
            <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="md:hidden mt-4 flex flex-col gap-4">
            <Link href="/admin/projects" onClick={() => setMenuOpen(false)}>Проекты</Link>
            <Link href="/admin/models" onClick={() => setMenuOpen(false)}>Модели</Link>
            <Link href="/admin/support" onClick={() => setMenuOpen(false)}>Техподдержка</Link>
            <button onClick={() => { setMenuOpen(false); AuthService.logout(); router.reload(); }} className="bg-blue-700 px-4 py-2 rounded-md">
              Выйти
            </button>
          </nav>
        )}
      </header>
      <main className="flex-grow md:mx-[100px] sm:mx-[10px]">
        {children}
      </main>
      <footer className="bg-[#E1E0EC] text-white p-4">
        <div className="container mx-auto text-center text-text">
          &copy; 2024 Гефест
        </div>
      </footer>
    </div>
  );
};

export default AdminLayout;
