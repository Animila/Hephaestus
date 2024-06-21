// pages/_app.js
import '../styles/globals.css';
import { AuthProvider } from "@/contexts/auth_context";
import { ModalProvider } from "@/contexts/modal_context";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ModalProvider>
        <Component {...pageProps} />
      </ModalProvider>
    </AuthProvider>
  );
}

export default MyApp;