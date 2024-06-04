// pages/admin.js
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import AdminLayout from "@/layouts/admin_layout";
import { Premium } from "@/assets/Premium";
import { CabinetService } from "@/services/CabinetService";
import ProjectModal from "@/modals/ProjectModal";
import { AuthService } from "@/services/AuthService";
import UserEditModal from "@/modals/EditUserModal";

const Admin = () => {
  const { checkAuth, user, setUser } = useContext(AuthContext);
  const router = useRouter();
  const [projects, setProjects] = useState([])
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [isUserModalOpen, setUserModalOpen] = useState(false);

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

  const handleAddOrUpdateProject = (title, projectId) => {
    const token = localStorage.getItem('token')

    if (projectId) {
      CabinetService.update(title, projectId, token).then(res => {
        if (res.status === 200) {
          loadProjects(token)
        }
      });
    } else {
      CabinetService.create(title, user.id, token).then(res => {
        if (res.status === 201) {
          loadProjects(token)
        }
      });
    }
  };

  const handleDeleteProject = (projectId) => {
    const token = localStorage.getItem('token');
    CabinetService.delete(projectId, token).then(res => {
      if (res.status === 200) {
        loadProjects(token);
      }
    });
  };

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

  return (
    user && <AdminLayout>
      <div className='grid md:grid-cols-12 sm:grid-cols-1 mt-[50px] gap-[20px]'>

        <div className='sm:col-span-1 md:col-span-4'>

          <div className='bg-white rounded-[20px] px-[14px] py-[10px]'>
            <div className='flex items-center justify-between h-[100px]'>
              <span className='text-[30px] font-medium'>{user.first_name} {user.last_name}</span>
              <Premium />
            </div>
            <button
              className='flex text-blue justify-center items-center py-[18px] w-full bg-[#E1E0EC] rounded-[10px] leading-[100%] tracking-[-3%] text-[16px]'
            onClick={() => {
              setUserModalOpen(true)
            }}>
              Редактировать профиль
            </button>
          </div>

          <div className="bg-[#E1E0EC] grid grid-cols-4 gap-[12px] p-[10px] mt-[40px]">
            <div className="col-span-2 bg-white rounded-[15px] p-[20px]">
              <span className='text-blue text-[32px] font-medium'>89</span>
              <p style={{overflowWrap: 'anywhere'}}>Сгенерированных моделей</p>
            </div>
            <div className="col-span-2 bg-white rounded-[15px] p-[20px]">
              <span className='text-blue text-[32px] font-medium'>{projects.length}</span>
              <p style={{overflowWrap: 'anywhere'}}>Проектов</p>
            </div>
            <div className="col-span-2 bg-white rounded-[15px] p-[20px]">
              <span style={{overflowWrap: 'anywhere'}}>Дата регистрации </span>
              <p className='text-blue text-[20px] font-medium' style={{overflowWrap: 'anywhere'}}>{new Date(user.created_at).toLocaleDateString() + ' ' + new Date(user.created_at).toLocaleTimeString()}</p>
            </div>
            <div className="col-span-2 bg-white rounded-[15px] p-[20px] flex flex-col justify-between">
              <div className='flex justify-between items-center'>
                <span>Тариф</span>
                {/*{user.role.title === 'Администратор' && <Premium />}*/}
              </div>
              <div className='text-blue text-[20px] font-medium' style={{overflowWrap: 'anywhere'}}>
                {/*{user.role.title !== 'Пользователь' ? user.role.title : 'Новичок'}*/}
              </div>
            </div>
          </div>
        </div>


        <div className="sm:col-span-1 md:col-span-8">
          <button className="w-full border-blue text-blue border-[1px] py-[10px] rounded-[10px] hover:bg-light_blue"  onClick={() => {
            setModalOpen(true);
            setCurrentProject(null);
          }}>
            + Добавить проект
          </button>
          <div className='grid sm:grid-cols-1 md:grid-cols-2 gap-[20px] mt-[20px]'>
            {projects.map((project, index) =>
              <div className="col-span-1 bg-white rounded-[20px] px-[40px] py-[30px] flex-col flex justify-between" key={project.id}>
                <span className='text-[25px] font-bold'>Название: <span className='font-medium'>{project.title}</span></span>
                <span className='text-[25px] font-bold'>Моделей: <span>30 штук</span></span>
                <div className="flex justify-between mt-[100px] flex-wrap">
                  <button
                    className='bg-blue py-[10px] px-[20px] rounded-[10px] text-white leading-[100%] tracking-[-3%]' onClick={() => { setModalOpen(true); setCurrentProject(project); }}>Редактировать
                  </button>
                  <button
                    className='bg-red-500 py-[10px] px-[20px] rounded-[10px] text-white leading-[100%] tracking-[-3%]' onClick={() => handleDeleteProject(project.id)}>Удалить
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAddOrUpdateProject}
        project={currentProject}
      />
      <UserEditModal
        isOpen={isUserModalOpen}
        onClose={() => setUserModalOpen(false)}
        onSubmit={handleUpdateUser}
        user={user}
      />
    </AdminLayout>
  );
};

export default Admin;
