import styled from 'styled-components';

export default function Nav() {
  return (
    <Container>
      <NavList>
        <li>홈</li>
      </NavList>
    </Container>
  );
}

const Container = styled.nav`
  max-width: 61.25rem;
  background-color: tomato;
  margin: 0 auto;
`;

const NavList = styled.ul`
  height: 2.5rem;
  margin: 5px 0px;
`;
