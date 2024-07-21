import styled from 'styled-components';

export default function Footer() {
  return (
    <Container>
      <div>© 2024, Hyeongwoo Kim</div>
    </Container>
  );
}

const Container = styled.footer`
  background-color: #16181d;
  padding: 2rem;

  & div {
    width: 980px;
    margin: 0 auto;
  }
`;
