import React, { useEffect, useState } from "react";
import { useAuth } from "@/contexts/auth_context";
import AdminLayout from "@/layouts/admin_layout";
import { CabinetService } from "@/services/CabinetService";
import { ModelsService } from "@/services/ModelsService";
import ModelModal from "@/modals/ModelModal";
import { useRouter } from "next/router";
import { DeleteSVG } from "@/assets/DeleteSVG";
import { EditSVG } from "@/assets/EditSVG";
import { ShareSVG } from "@/assets/ShareSVG";

const Models = () => {
  const router = useRouter();
  const [projects, setProjects] = useState([]);
  const [models, setModels] = useState([
    {
      "id": 1,
      "title": "Тестовые данные 2",
      "description": "Это первые тесты модели 2",
      "user_id": "3",
      "file_size": "4096",
      "file_path": "/files/models/1/model6.pkl",
      "created_At": "2024.05.20 16:52:59"
    },
    {
      "id": 2,
      "title": "Рекомендации по животным",
      "description": "Написать хоть что-то",
      "user_id": "3",
      "file_size": "4096",
      "file_path": "/files/models/2/model1.pkl",
      "created_At": "2024.05.23 12:23:00"
    }
  ]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentModal, setCurrentModal] = useState(null);
  const [selectedModels, setSelectedModels] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    loadProjects(token);
    loadModels();
  }, [router.isReady]);

  const loadModels = () => {
    const project_id = router.query.project_id;

    // if (project_id) {
    //   ModelsService.getModels(project_id)
    //     .then((res) => {
    //       console.log("Models for project_id=", project_id, ":", res.data);
    //       setModels(groupModelsByProject(res.data));
    //     })
    //     .catch((err) => {
    //       console.log("Error loading models:", err);
    //     });
    // } else {
    //   ModelsService.getModels()
    //     .then((res) => {
    //       console.log("All models:", res.data);
    //       setModels(groupModelsByProject(res.data));
    //     })
    //     .catch((err) => {
    //       console.log("Error loading models:", err);
    //     });
    // }
  };

  const groupModelsByProject = (models) => {
    const groupedModels = [];
    const projectGroups = {};

    models.forEach((model) => {
      if (!projectGroups[model.project_id]) {
        projectGroups[model.project_id] = [];
      }
      projectGroups[model.project_id].push(model);
    });

    Object.keys(projectGroups).forEach((projectId) => {
      groupedModels.push({
        project_id: projectId,
        models: projectGroups[projectId],
      });
    });

    return groupedModels;
  };

  const loadProjects = (token) => {
    CabinetService.getAll(token).then((res) => {
      console.log("Projects:", res.data);
      setProjects(res.data);
    });
  };

  const formatFileSize = (sizeInBytes) => {
    return `${(sizeInBytes / 1024).toFixed(2)} KB`;
  };

  const handleDeleteModel = (modelId) => {
    setModels(models.filter(model => model.id !== modelId));
  };

  const handleBulkDelete = () => {
    setModels(models.filter(model => !selectedModels.includes(model.id)));
    setSelectedModels([]);
  };

  const handleSelectModel = (modelId) => {
    setSelectedModels((prevSelected) =>
      prevSelected.includes(modelId)
        ? prevSelected.filter((id) => id !== modelId)
        : [...prevSelected, modelId]
    );
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(`https://api.animila.ru${text}`);
  };

  return (
    <AdminLayout>
      {projects.length === 0 ? (
        <div className="w-full text-blue text-center mb-[20px]">
          Для работы с моделями необходимо создать хотя бы один проект
          <br />
          <a href="/admin/projects" className="underline">Создать проект</a>
        </div>
      ) : (
        <button
          className="w-full border-blue text-blue border-[1px] py-[10px] rounded-[10px] hover:bg-light_blue"
          onClick={() => {
            setModalOpen(true);
            setCurrentModal(null);
          }}
        >
          + Добавить модель
        </button>
      )}
      {projects.map((project) => (
        <div key={project.id} className="mt-4">
          <div className="flex flex-row justify-between bg-white py-[19px] px-[24px] items-center rounded-[14px]">
            <h2 className="text-[22px] font-bold">{project.title}</h2>
            <div className="flex-1"></div>
            <div className="flex items-center">
              {selectedModels.length > 0 && (
                <span className="text-blue mr-4">{selectedModels.length} выбрано</span>
              )}
              <button
                className="bg-[#E1E0EC] py-[10px] px-[9px] rounded-[4px] text-blue"
                onClick={handleBulkDelete}
                disabled={selectedModels.length === 0}
              >
                <DeleteSVG color={"#1E3A8A"} />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 mt-2">
            {models.map((model) =>
              <div key={model.id} className="flex md:flex-row items-center bg-white p-4 rounded shadow">
                <input
                  type="checkbox"
                  className="mr-4"
                  checked={selectedModels.includes(model.id)}
                  onChange={() => handleSelectModel(model.id)}
                />
                <div className="flex-1">{new Date(model.created_At).toLocaleDateString()}</div>
                <div className="flex-1 md:block sm:hidden">
                  <a href={model.file_path} target="_blank" rel="noopener noreferrer">
                    {model.file_path}
                  </a>
                </div>
                <div className="flex-1">{formatFileSize(model.file_size)}</div>
                <div className="flex-1 flex justify-end space-x-2">
                  <button onClick={() => {
                    setCurrentModal(model);
                    setModalOpen(true);
                  }}>
                    <EditSVG color={"#1E3A8A"} />
                  </button>
                  <button onClick={() => copyToClipboard(model.file_path)}>
                    <ShareSVG color={"#1E3A8A"} />
                  </button>
                  <button onClick={() => handleDeleteModel(model.id)}>
                    <DeleteSVG color={"#1E3A8A"} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
      <ModelModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        projects={projects}
        model={currentModal}
      />
    </AdminLayout>
  );
};

export default Models;
