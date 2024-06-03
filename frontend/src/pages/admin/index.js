// pages/admin.js
import React, { useContext, useEffect } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import AdminLayout from "@/layouts/admin_layout";
import { Premium } from "@/assets/Premium";

const Admin = () => {
  const { checkAuth } = useContext(AuthContext);
  const router = useRouter();

  // useEffect(() => {
  //   checkAuth().then(res => {
  //     if(!res) {
  //       router.push('/login')
  //     }
  //   })
  // }, [])

  return (
    <AdminLayout>
      <div className='grid md:grid-cols-12 mt-[50px]'>

        <div className='col-span-4'>

          <div className='bg-white rounded-[20px] px-[14px] py-[10px]'>
            <div className='flex items-center justify-between h-[100px]'>
              <span className='text-[30px] font-medium'>Андрей Иванов</span>
              <Premium />
            </div>
            <button
              className='flex text-blue justify-center items-center py-[18px] w-full bg-[#E1E0EC] rounded-[10px] leading-[100%] tracking-[-3%] text-[16px]'>
              Редактировать профиль
            </button>
          </div>

          <div className="bg-[#E1E0EC] grid grid-cols-4 gap-[12px] p-[10px] mt-[40px]">
            <div className="col-span-2 bg-white rounded-[15px] p-[20px]">
              <span className='text-blue text-[32px] font-medium'>89</span>
              <p>Сгенерированных моделей</p>
            </div>
            <div className="col-span-2 bg-white rounded-[15px] p-[20px]">
              <span className='text-blue text-[32px] font-medium'>12</span>
              <p>Проектов</p>
            </div>
            <div className="col-span-2 bg-white rounded-[15px] p-[20px]">
              <span>Дата регистрации </span>
              <p className='text-blue text-[20px] font-medium'>5 мая 2019, 13:50</p>
            </div>
            <div className="col-span-2 bg-white rounded-[15px] p-[20px] flex flex-col justify-between">
              <div className='flex justify-between items-center'>
                <span>Тариф</span>
                <Premium />
              </div>
              <div className='text-blue text-[32px] font-medium'>
                Профи
              </div>
            </div>
          </div>
        </div>






        <div className='col-span-8'>

        </div>
      </div>
    </AdminLayout>
  );
};

export default Admin;
