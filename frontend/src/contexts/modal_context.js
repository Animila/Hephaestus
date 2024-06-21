'use client'
import React, { createContext, useContext, useState } from 'react';

// Создаем контекст
const Modal_context = createContext();

// Провайдер контекста
export const ModalProvider = ({ children }) => {
  const [activeUserSettings, setActiveUserSettings] = useState(false)
  const [activeProject, setActiveProject] = useState(false)
  const [activeModel, setActiveModel] = useState(false)


  return (
    <Modal_context.Provider value={{ activeUserSettings, setActiveUserSettings, activeProject, setActiveProject, activeModel, setActiveModel }}>
      {children}
    </Modal_context.Provider>
  );
};

// Хук для использования контекста
export const useModal = () => useContext(Modal_context);