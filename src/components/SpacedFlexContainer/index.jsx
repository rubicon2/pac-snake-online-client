import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export default function SpacedFlexContainer({ children }) {
  return <Container>{children}</Container>;
}
