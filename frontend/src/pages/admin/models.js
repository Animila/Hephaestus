import React, { useContext, useEffect, useState } from "react";
import { Auth_context } from "@/contexts/auth_context";
import { useRouter } from "next/router";
import AdminLayout from "@/layouts/admin_layout";
import { Premium } from "@/assets/Premium";
import { AuthService } from "@/services/AuthService";
import UserEditModal from "@/modals/EditUserModal";

const Models = () => {

  return (
    <AdminLayout>
      <div className="grid md:grid-cols-12 sm:grid-cols-1 mt-[50px] gap-[20px]">
fghjkl;
        <div className="sm:col-span-1 md:col-span-8"></div>
      </div>
    </AdminLayout>
  );
};

export default Models;
