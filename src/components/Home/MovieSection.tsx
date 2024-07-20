import { Link, Outlet } from 'react-router-dom';
import { ROUTER_PATH } from '../../shared/constants';

export default function MovieSection() {
  return (
    <section>
      <nav>
        <Link to={ROUTER_PATH.root}>무비차트</Link>
        <Link to={ROUTER_PATH.comingSoon}>상영예정작</Link>
        <Link to={ROUTER_PATH.nowPlaying}>현재상영작</Link>
      </nav>
      <Outlet />
    </section>
  );
}
