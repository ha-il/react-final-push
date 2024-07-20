import { Outlet } from 'react-router-dom';
import Header from '../components/layouts/Header';
import Nav from '../components/layouts/Nav';
import Footer from '../components/layouts/Footer';

export default function Root() {
  return (
    <>
      <Header />
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
}
