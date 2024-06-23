// components/ProjectModal.js
import React, { useEffect, useState } from "react";
import { ModelsService } from "@/services/ModelsService";
import { useAuth } from "@/contexts/auth_context";

const ModalModal = ({ isOpen, onClose, onSubmit, model }) => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (model) {
      setTitle(model.title);
      setDescription(model.description);
    } else {
      setTitle('');
      setDescription('');
    }
  }, [model]);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setLoading(true);
      setTimeout(() => {
        setFile(uploadedFile);
        setFileName(uploadedFile.name);
        setLoading(false);
      }, 1000);
    }
  };

  const handleDeleteFile = () => {
    setFile(null);
    setFileName('');
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const parsedData = await parseCSVToJson(file);
      console.log('Parsed Data: ', parsedData);
      await ModelsService.newModel(
        user.id,
        title,
        description,
        `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`,
        parsedData
      );
      setTitle('');
      setDescription('');
      setFile(null);
      setFileName('');
    } catch (error) {
      console.error('Error creating new model:', error);
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50" onClick={onClose}>
      <div className="bg-white py-[20px] px-[40px] rounded-[20px] shadow-lg" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-[30px] font-bold">Новая модель</h2>
        <span className="text-[20px] mt-[20px]">Название</span>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-[10px] w-full py-[8px] px-[16px] bg-white h-[54px] border border-[#E6E6E6] rounded-[16px] mb-4"
          placeholder="Например, ООО “Компания” или Раздел продуктов"
        />
        <span className="text-[20px] mt-[20px]">Описание</span>
        <textarea
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-[10px] w-full py-[16px] px-[16px] h-[146px] bg-white border border-[#E6E6E6] rounded-[16px] mb-4"
          placeholder="Описание данной модели"
        />

        <div className="flex flex-col items-center mt-4">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            style={{ display: "none" }}
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer w-full">
            <div className="w-full border border-blue text-blue px-4 py-[30px] rounded flex justify-center items-center">
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue"></div>
              ) : fileName ? (
                <>
                  <span className="text-sm truncate">{fileName}</span>
                  <button onClick={handleDeleteFile} className="text-red-500 ml-2">
                    Удалить
                  </button>
                </>
              ) : (
                "Загрузить файл"
              )}
            </div>
          </label>
        </div>

        <div className="flex justify-between mt-4">
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
            Создать
          </button>
        </div>
      </div>
    </div>
  );
};
const parseCSVToJson = async (file) => {
  return {
    "data": {
      "columns": [
        {
          "type": "str",
          "name": "title",
          "data": [
            "Toy Story",
            "Jumanji",
            "Grumpier Old Men",
            "Waiting to Exhale",
            "Father of the Bride Part II"
          ]
        },
        {
          "type": "list",
          "name": "genres",
          "data": [
            ["Adventure", "Animation", "Children", "Comedy", "Fantasy"],
            ["Adventure", "Children", "Fantasy"],
            ["Comedy", "Romance"],
            ["Comedy", "Drama", "Romance"],
            ["Comedy"]
          ]
        }
      ]
    },
    "target_data": {
      "columns": [
        {
          "type": "int",
          "name": "rating",
          "data": [
            5,
            3,
            4,
            3,
            3
          ]
        },
        {
          "type": "float",
          "name": "random",
          "data": [
            0.828916,
            0.283169,
            0.980062,
            0.744060,
            0.386980
          ]
        },
        {
          "type": "bool",
          "name": "like",
          "data": [
            true,
            false,
            true,
            true,
            false
          ]
        }
      ]
    }
  }
};


export default ModalModal;
