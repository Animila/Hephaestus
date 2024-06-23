import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth_context";
import AdminLayout from "@/layouts/admin_layout";
import { CabinetService } from "@/services/CabinetService";
import ProjectModal from "@/modals/ProjectModal";
import { ShareSVG } from "@/assets/ShareSVG";
import { EditSVG } from "@/assets/EditSVG";
import { DeleteSVG } from "@/assets/DeleteSVG";

const Admin = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([])
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token')
    loadProjects(token)
  }, [])


  const loadProjects = (token) => {
    CabinetService.getAll(token).then(res => {
      console.log('2345676543', res.data)
      setProjects(res.data)
    })
  }

  const handleAddOrUpdateProject = (title,description, projectId) => {
    const token = localStorage.getItem('token')

    if (projectId) {
      CabinetService.update(title, description, projectId, token).then(res => {
        if (res.status === 200) {
          loadProjects(token)
        }
      });
    } else {
      CabinetService.create(title, description, user.id, token).then(res => {
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
              <div className="col-span-1 bg-white rounded-[20px] px-[20px] py-[15px] flex-col flex justify-between" key={project.id}>
                <span className='text-[25px] font-bold'>Название: <br className="sm:block md:hidden"/> <span className='font-medium'>{project.title}</span></span>
                <span className='text-[25px] font-bold'>Моделей: <br className="sm:block md:hidden"/> <span className='font-medium'>30 штук</span></span>
                <div className="flex sm:justify-center sm:items-center sm:gap-[10px] md:gap-0 md:justify-between mt-[100px] flex-wrap">
                  <button
                    className="bg-blue py-[10px] px-[20px] rounded-[10px] text-white text-[20px]"
                    onClick={() => {

                    }}>
                    Открыть
                  </button>
                  <div className="flex flex-row gap-[10px] justify-center items-center">
                    <button
                      className="bg-blue py-[10px] px-[9px] rounded-[10px] text-white"
                      onClick={() => {
                      }}>
                      <ShareSVG />
                    </button>
                    <button
                      className="bg-[#FF4B24] py-[10px] px-[9px] rounded-[10px] text-white"
                      onClick={() => {
                        setModalOpen(true);
                        setCurrentProject(project);
                      }}>
                      <EditSVG />
                    </button>
                    <button
                      className="bg-button py-[10px] px-[9px] rounded-[10px] text-white"
                      onClick={() => {
                        handleDeleteProject(project.id)
                      }}>
                      <DeleteSVG />
                    </button>
                  </div>
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
