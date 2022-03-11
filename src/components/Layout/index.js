import styled from 'styled-components';

export const Body = styled.div`
  color: ${({ theme }) => theme.text};
  display: flex;
  flex-direction: column;
  font-size: calc(10px + 2vmin);
  min-height: calc(100vh - 135px);
`;

export const Center = styled.div`
  color: ${({ theme }) => theme.text};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: calc(10px + 2vmin);
  min-height: calc(100vh - 135px);

  @media (max-width: 426px) {
    font-size: 2.5vw;
  }
`;

export const Pressed = styled.div`
  border-radius: ${(props) => props.BorderRadius || '50px'};
  width: ${(props) => props.width || ''};
  min-height: ${(props) => props.minHeight || ''};
  background: ${({ theme }) => theme.background};
  box-shadow: ${({ theme }) => theme.pressed};
`;
