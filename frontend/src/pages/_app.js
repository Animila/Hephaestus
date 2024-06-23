// pages/_app.js
import '../styles/globals.css';
import { AuthProvider } from "@/contexts/auth_context";
import { ModalProvider } from "@/contexts/modal_context";
import { ChatProvider } from "@/contexts/chat_context";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ModalProvider>
        <ChatProvider>
          <Component {...pageProps} />
        </ChatProvider>
      </ModalProvider>
    </AuthProvider>
  );
}

export default MyApp;