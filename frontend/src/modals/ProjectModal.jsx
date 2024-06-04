// components/ProjectModal.js
import React, { useEffect, useState } from "react";

const ProjectModal = ({ isOpen, onClose, onSubmit, project }) => {
  const [title, setTitle] = useState('');

  useEffect(() => {
    if (project) {
      setTitle(project.title);
    } else {
      setTitle('');
    }
  }, [project]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmit(title, project ? project.id : null);
    setTitle('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50" onClick={onClose}>
      <div className="bg-white py-[30px] px-[60px] rounded-lg shadow-lg" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-4">{project ? 'Редактировать проект' : 'Создать проект'}</h2>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder="Название проекта"
        />
        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="border-blue border-2 text-blue px-4 py-2 rounded mr-2"
          >
            Отмена
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue text-white px-4 py-2 rounded"
          >
            {project ? 'Сохранить' : 'Создать'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
