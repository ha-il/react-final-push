import styled from 'styled-components';

export default function Header() {
  return (
    <Container>
      <Logo>
        <img src="../../../public/images/logo.svg" alt="" />
        <Text>Redefining Entertainment, Advancing Cinema Together</Text>
      </Logo>
    </Container>
  );
}

const Container = styled.header`
  max-width: 61.25rem;

  margin: 0 auto;
`;

const Logo = styled.div`
  height: 3.5625rem;
  margin: 28px 5px 27px 5px;
  display: flex;
  align-items: end;
`;

const Text = styled.span`
  font-weight: 300;
  letter-spacing: 0.1em;
  line-height: 1.5em;
  font-size: 0.9rem;
  padding-bottom: 0.7rem;
`;
