import styled from 'styled-components';

export default function Nav() {
  return (
    <Container>
      {/* <NavList>
        <StyledNavLink to={ROUTER_PATH.root}>홈</StyledNavLink>
      </NavList> */}
    </Container>
  );
}

const Container = styled.nav`
  margin: 0 auto;
  border-top: rgba(255, 255, 255, 0.05) 1px solid;
  border-bottom: #58c4dc 3px solid;
`;

// const NavList = styled.ul`
//   height: 2.5rem;
//   max-width: 61.25rem;
//   margin: 0 auto;
//   display: flex;
//   align-items: center;
//   padding: 5px 0px;
// `;

// const StyledNavLink = styled(NavLink)`
//   font-weight: 500;
//   font-size: 16px;
//   line-height: 1.5em;
//   margin-left: 1.25rem;
//   text-decoration: none;
//   color: #999;
//   &.active {
//     color: white;
//     font-weight: 700;
//   }
// `;
