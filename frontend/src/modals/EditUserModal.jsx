// modals/UserEditModal.js
import React, { useEffect, useState } from 'react';
import { CabinetService } from "@/services/CabinetService";

const UserEditModal = ({ isOpen, onClose, onSubmit, user }) => {
  const [firstName, setFirstName] = useState(user?.first_name || '');
  const [lastName, setLastName] = useState(user?.last_name || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [email, setEmail] = useState(user?.email || '');
  const [activated, setActivated] = useState(user?.activated || false);
  const [roleId, setRoleId] = useState(user?.role_id || 1);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    CabinetService.getRoles().then(res => {
      setRoles(res.data);
    });
  }, []);

  const handleSubmit = () => {
    const updatedUser = {
      first_name: firstName,
      last_name: lastName,
      phone,
      email,
      activated,
      role_id: roleId,
      created_at: user.created_at,
      role: roles.find(item => item.id === roleId)
    };
    onSubmit(updatedUser);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50" onClick={onClose}>
      <div className="bg-white py-[30px] px-[60px] rounded-lg shadow-lg" onClick={(e) => e.stopPropagation()}>
      <h2 className="text-xl font-bold mb-4">Редактировать профиль</h2>
      <form className='flex flex-col'>
        <label>
          Имя:
          <input className="w-full p-2 border border-gray-300 rounded mb-4" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </label>
        <label>
          Фамилия:
          <input className="w-full p-2 border border-gray-300 rounded mb-4" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </label>
        <label>
          Телефон:
          <input className="w-full p-2 border border-gray-300 rounded mb-4" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </label>
        <label>
          Email:
          <input className="w-full p-2 border border-gray-300 rounded mb-4" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        {/*<label>*/}
        {/*  Активирован:*/}
        {/*  <input className='ml-[10px]' type="checkbox" checked={activated} onChange={(e) => setActivated(e.target.checked)} />*/}
        {/*</label>*/}
        {/*<label>*/}
        {/*  Роль:*/}
        {/*  <select className="w-full p-2 border border-gray-300 rounded mb-4" value={roleId} onChange={(e) => setRoleId(Number(e.target.value))}>*/}
        {/*    {roles.map((role) => (*/}
        {/*      <option key={role.id} value={role.id}>{role.title}</option>*/}
        {/*    ))}*/}
        {/*  </select>*/}
        {/*</label>*/}
        <button className='flex justify-center items-center w-full py-[10px] bg-blue text-white rounded' type="button" onClick={handleSubmit}>Сохранить</button>
      </form>
      </div>
    </div>
  );
};

export default UserEditModal;
