import { NavLink, Outlet } from 'react-router-dom';
import { ROUTER_PATH } from '../../shared/constants';
import styled from 'styled-components';

export default function MovieSection() {
  return (
    <MovieSectionContainer>
      <Nav>
        <StyledNavLink to={ROUTER_PATH.root}>무비차트</StyledNavLink>
        <StyledNavLink to={ROUTER_PATH.comingSoon}>상영예정작</StyledNavLink>
        <StyledNavLink to={ROUTER_PATH.nowPlaying}>현재상영작</StyledNavLink>
      </Nav>
      <Outlet />
    </MovieSectionContainer>
  );
}

const MovieSectionContainer = styled.section`
  margin: 0 auto;
  max-width: 61.25rem;
  padding: 50px 0 60px 0;
`;

const Nav = styled.nav`
  height: 2.3125rem;
  margin-bottom: 20px;
  display: flex;
  gap: 1rem;
`;

const StyledNavLink = styled(NavLink)`
  font-weight: 400;
  font-size: 26px;
  color: #999;
  line-height: 1.423em;
  text-decoration: none;
  &.active {
    color: white;
    font-weight: 700;
  }
`;
