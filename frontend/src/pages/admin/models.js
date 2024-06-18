import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import AdminLayout from "@/layouts/admin_layout";
import { Premium } from "@/assets/Premium";
import { AuthService } from "@/services/AuthService";
import UserEditModal from "@/modals/EditUserModal";

const Models = () => {
  const { checkAuth, user, setUser } = useContext(AuthContext);
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [isUserModalOpen, setUserModalOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    checkAuth()
      .then((res) => {
        if (!res) {
          router.push("/login");
        }
      })
      .catch(() => {
        router.push("/login");
      });
  }, []);

  const handleUpdateUser = (updatedUser) => {
    const token = localStorage.getItem("token");
    AuthService.updateUser(user.id, updatedUser, token).then((res) => {
      if (res.status === 200) {
        setUser((prevUser) => ({
          ...prevUser,
          ...updatedUser,
          role: res.data.role, // Если роль также возвращается в ответе
        }));
      }
    });
  };

  if (!user) {
    return <div>Loading...</div>; // or any other loading indicator
  }

  return (
    <AdminLayout>
      <div className="grid md:grid-cols-12 sm:grid-cols-1 mt-[50px] gap-[20px]">
        <div className="sm:col-span-1 md:col-span-4">
          <div className="bg-white rounded-[20px] px-[14px] py-[10px]">
            <div className="flex items-center justify-between h-[100px]">
              <span className="text-[30px] font-medium">
                {user.first_name} {user.last_name}
              </span>
              <Premium />
            </div>
            <button
              className="flex text-blue justify-center items-center py-[18px] w-full bg-[#E1E0EC] rounded-[10px] leading-[100%] tracking-[-3%] text-[16px]"
              onClick={() => {
                setUserModalOpen(true);
              }}
            >
              Редактировать профиль
            </button>
          </div>

          <div className="bg-[#E1E0EC] grid grid-cols-4 gap-[12px] p-[10px] mt-[40px]">
            <div className="col-span-2 bg-white rounded-[15px] p-[20px]">
              <span className="text-blue text-[32px] font-medium">89</span>
              <p style={{ overflowWrap: "anywhere" }}>Моделей</p>
            </div>
            <div className="col-span-2 bg-white rounded-[15px] p-[20px]">
              <span className="text-blue text-[32px] font-medium">
                {projects.length}
              </span>
              <p style={{ overflowWrap: "anywhere" }}>Проектов</p>
            </div>
            <div className="col-span-4 bg-white rounded-[15px] p-[20px]">
              <span style={{ overflowWrap: "anywhere" }}>Дата регистрации </span>
              <p
                className="text-blue text-[20px] font-medium"
                style={{ overflowWrap: "anywhere" }}
              >
                {new Date(user.created_at).toLocaleDateString() +
                  " " +
                  new Date(user.created_at).toLocaleTimeString()}
              </p>
            </div>
            <div className="col-span-4 bg-white rounded-[15px] p-[20px] flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <span>Тариф</span>
                {/*{user.role.title === 'Администратор' && <Premium />}*/}
              </div>
              <div
                className="text-blue text-[20px] font-medium"
                style={{ overflowWrap: "anywhere" }}
              >
                {/*{user.role.title !== 'Пользователь' ? user.role.title : 'Новичок'}*/}
              </div>
            </div>
          </div>
        </div>
        <div className="sm:col-span-1 md:col-span-8"></div>
      </div>
      <UserEditModal
        isOpen={isUserModalOpen}
        onClose={() => setUserModalOpen(false)}
        onSubmit={handleUpdateUser}
        user={user}
      />
    </AdminLayout>
  );
};

export default Models;
