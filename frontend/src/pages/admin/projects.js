import React, { useContext, useEffect, useState } from "react";
import { Auth_context } from "@/contexts/auth_context";
import AdminLayout from "@/layouts/admin_layout";
import { CabinetService } from "@/services/CabinetService";
import ProjectModal from "@/modals/ProjectModal";

const Admin = () => {
  const { user } = useContext(Auth_context);
  const [projects, setProjects] = useState([])
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);


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


  return (
    <AdminLayout>
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
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAddOrUpdateProject}
        project={currentProject}
      />
    </AdminLayout>
  );
};

export default Admin;
