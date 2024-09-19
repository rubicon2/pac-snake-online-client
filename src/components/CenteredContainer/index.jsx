import styled from 'styled-components';

const Container = styled.div`
  width: 800px;
  margin: 0 auto;
`;

export default function CenteredContainer({ children }) {
  return <Container>{children}</Container>;
}
