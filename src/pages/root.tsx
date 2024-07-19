import { Outlet } from 'react-router-dom';

export default function Root() {
  return (
    <>
      <h1>Hello 졸업작품!</h1>
      <Outlet />
    </>
  );
}
