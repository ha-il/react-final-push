import { Link, Outlet } from 'react-router-dom';
import { ROUTER_PATH } from '../../shared/constants';
import styled from 'styled-components';

export default function MovieSection() {
  return (
    <MovieSectionContainer>
      <Nav>
        <Link to={ROUTER_PATH.root}>무비차트</Link>
        <Link to={ROUTER_PATH.comingSoon}>상영예정작</Link>
        <Link to={ROUTER_PATH.nowPlaying}>현재상영작</Link>
      </Nav>
      <Outlet />
    </MovieSectionContainer>
  );
}

const MovieSectionContainer = styled.section`
  margin: 0 auto;
  max-width: 65.125rem;
  padding: 50px 30px 60px 30px;
  background-color: cornflowerblue;
`;

const Nav = styled.nav`
  height: 2.3125rem;
  margin-bottom: 20px;
`;
