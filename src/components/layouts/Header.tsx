import styled from 'styled-components';

export default function Header() {
  return (
    <Container>
      <Logo>LOGO</Logo>
    </Container>
  );
}

const Container = styled.header`
  max-width: 61.25rem;
  background-color: tomato;
  margin: 0 auto;
`;

const Logo = styled.div`
  height: 3.5625rem;
  margin: 28px 5px 27px 5px;
`;
