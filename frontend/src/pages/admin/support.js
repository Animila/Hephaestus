import AdminLayout from "@/layouts/admin_layout";
import { Chat } from "@/components/chat";
import { MessageSend } from "@/components/message_send";

const Support = () => {
  return  <AdminLayout>
    <Chat/>
    <MessageSend/>
</AdminLayout>
}

export default Support