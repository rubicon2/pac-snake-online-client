import styled from 'styled-components';

const Button = styled.button`
  cursor: pointer;
  border: none;
  background-color: #2c46db;
  color: white;
  font-size: 1rem;
  padding: 0.5em 1em;
  border-radius: 5px;
  min-width: 8rem;

  &:hover {
    filter: brightness(0.8);
  }

  &:disabled {
    cursor: not-allowed;
    filter: saturate(0.5) brightness(0.5);
  }
`;

export default function LobbyButton({ children, type = 'button', onClick }) {
  return (
    <Button type={type} onClick={onClick}>
      {children}
    </Button>
  );
}
