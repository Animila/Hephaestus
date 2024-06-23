import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth_context";
import AdminLayout from "@/layouts/admin_layout";
import { CabinetService } from "@/services/CabinetService";
import { ModelsService } from "@/services/ModelsService";
import ProjectModal from "@/modals/ProjectModal";
import ModelModal from "@/modals/ModelModal";
import { useRouter } from "next/router";

const Models = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [models, setModels] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentModal, setCurrentModal] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token')
    loadProjects(token)
    loadModels()
  }, [])

  const loadModels = () => {
    const project_id = router.query.project_id

    if (project_id) {
      ModelsService.getModels(project_id)
        .then((res) => {
          console.log("Models for project_id=", project_id, ":", res.data);
          setModels(groupModelsByUser(res.data));
        })
        .catch((err) => {
          console.log("Error loading models:", err);
        });
    } else {
      ModelsService.getModels()
        .then((res) => {
          console.log("All models:", res.data);
          setModels(groupModelsByUser(res.data));
        })
        .catch((err) => {
          console.log("Error loading models:", err);
        });
    }
  };

  const groupModelsByUser = (models) => {
    const groupedModels = [];
    const userGroups = {};

    models.forEach((model) => {
      if (!userGroups[model.user_id]) {
        userGroups[model.user_id] = [];
      }
      userGroups[model.user_id].push(model);
    });

    Object.keys(userGroups).forEach((userId) => {
      groupedModels.push({
        user_id: userId,
        models: userGroups[userId],
      });
    });

    return groupedModels;
  };


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
                  setCurrentModal(null);
                }}>
          + Добавить модель
        </button>
      }
      {projects.map((project) => (
        <div key={project.id} className="mt-4">
          <h2 className="text-lg font-semibold">{project.name}</h2>
          <div className="grid grid-cols-1 gap-4 mt-2">
            {/* Отображение моделей для текущего проекта или всех моделей */}
            {models.map((group) =>
              group.user_id === project.user_id ? (
                <div key={group.user_id} className="mt-4">
                  {group.models.map((model) => (
                    <div key={model.id} className="bg-white p-4 rounded shadow">
                      <h3 className="text-md font-semibold">{model.title}</h3>
                      <p className="text-sm text-gray-500">{model.description}</p>
                    </div>
                  ))}
                </div>
              ) : null
            )}
          </div>
        </div>
      ))}
      <ModelModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={() => {}}
        project={currentModal}
      />
    </AdminLayout>
  );
};

export default Models;
