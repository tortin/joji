import { AuthProvider } from './context/AuthContext';
import AppNav from './navigation/appNav';

export default function App() {
  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
}

