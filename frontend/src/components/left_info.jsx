export const LeftInfo = ({setUserModalOpen, projects, user, models}) => {
  return <div className='sm:col-span-1 md:col-span-4'>

    <div className='bg-white rounded-[20px] px-[14px] py-[10px]'>
      <div className='flex items-center justify-between h-[100px]'>
        <span className='text-[30px] font-medium'>{user.first_name}{' '}{user.last_name}</span>
      </div>
      <button
        className='flex text-blue justify-center items-center py-[18px] w-full bg-[#E1E0EC] rounded-[10px] leading-[100%] tracking-[-3%] text-[16px]'
        onClick={() => {
          setUserModalOpen(true)
        }}>
        Редактировать профиль
      </button>
    </div>

    <div className="bg-[#E1E0EC] grid grid-cols-4 gap-[12px] p-[10px] mt-[40px]">
      <div className="col-span-2 bg-white rounded-[15px] p-[20px]">
        <span className='text-blue text-[32px] font-medium'>2</span>
        <p style={{ overflowWrap: 'anywhere' }}>Моделей</p>
      </div>
      <div className="col-span-2 bg-white rounded-[15px] p-[20px]">
        <span className='text-blue text-[32px] font-medium'>{projects.length}</span>
        <p style={{ overflowWrap: 'anywhere' }}>Проектов</p>
      </div>
      <div className="col-span-4 bg-white rounded-[15px] p-[20px]">
        <span style={{ overflowWrap: 'anywhere' }}>Дата регистрации </span>
        <p className='text-blue text-[20px] font-medium'
           style={{ overflowWrap: 'anywhere' }}>{new Date(user.created_at).toLocaleDateString() + ' ' + new Date(user.created_at).toLocaleTimeString()}</p>
      </div>
    </div>
  </div>
}

