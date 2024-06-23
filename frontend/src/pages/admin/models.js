import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth_context";
import AdminLayout from "@/layouts/admin_layout";
import { CabinetService } from "@/services/CabinetService";

const Models = () => {
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

  return (
    <AdminLayout>
      {projects.length === 0
        ? <div className="w-full text-blue text-center mb-[20px]">
          Для работы с моделями необходимо создать хотя бы один проект
          <br/>
          <a href="/admin/projects" className="underline">Создать проект</a>
      </div>
        : <button className="w-full border-blue text-blue border-[1px] py-[10px] rounded-[10px] hover:bg-light_blue"
                onClick={() => {
                  setModalOpen(true);
                  setCurrentProject(null);
                }}>
          + Добавить модель
        </button>
      }
    </AdminLayout>
  );
};

export default Models;
