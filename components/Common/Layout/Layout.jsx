import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { useRouter } from 'next/router';
import ModuleHeader from '../ModuleHeader/ModuleHeader';

const Layout = ({ children }) => {
  const router = useRouter();
  const path = router.pathname;

  return (
    <div>
      {path === '/signin' ? (
        <Header hideButton={true} />
      ) : path === '/patient' ||
        path.includes('/patient/') ||
        path === '/doctor' ||
        path.includes('/doctor/') ? (
        <ModuleHeader />
      ) : (
        <Header />
      )}
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
