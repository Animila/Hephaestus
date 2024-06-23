// components/AdminLayout.js
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { LogoSite } from "@/assets/LogoSite";
import Link from "next/link";
import { AuthService } from "@/services/AuthService";
import { LeftInfo } from "@/components/left_info";
import UserEditModal from "@/modals/EditUserModal";
import { useAuth } from "@/contexts/auth_context";
import { CabinetService } from "@/services/CabinetService";

const AdminLayout = ({ children }) => {
  const { checkAuth, user, setUser } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isUserModalOpen, setUserModalOpen] = useState(false);
  const [projects, setProjects] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('token')
    checkAuth().then(res => {
      console.log('3456789 ', res.data)
      // AuthService.getId(res.data.id).then(res => {
      //   setUser(res.data)
      // })
      if(!res) {
        router.push('/login')
      }
    }).catch(() => {
      router.push('/login')
    })
    loadProjects(token)
  }, [])

  const loadProjects = (token) => {
    CabinetService.getAll(token).then(res => {
      setProjects(res.data)
    })
  }

  const handleUpdateUser = (updatedUser) => {
    const token = localStorage.getItem('token');
    AuthService.updateUser(user.id, updatedUser, token).then(res => {
      if (res.status === 200) {
        setUser(prevUser => ({
          ...prevUser,
          ...updatedUser,
          role: res.data.role // Если роль также возвращается в ответе
        }));
      }
    });
  };

  if(!user) return <div>Loading...</div>

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
        <div className="grid md:grid-cols-12 sm:grid-cols-1 mt-[50px] gap-[20px]">
          {router.pathname !== '/admin/support' && <LeftInfo
            setUserModalOpen={setUserModalOpen}
            user={user}
            projects={projects}
          />}
          <div className={`sm:col-span-1 ${router.pathname !== '/admin/support' ? 'md:col-span-8' : 'md:col-span-12' }`}>
            {children}
          </div>
        </div>
        <UserEditModal
          isOpen={isUserModalOpen}
          onClose={() => setUserModalOpen(false)}
          onSubmit={handleUpdateUser}
          user={user}
        />
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
