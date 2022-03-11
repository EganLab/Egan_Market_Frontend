import styled from 'styled-components';

export const Button = styled.button`
  border: none;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  font-size: 0.9vw;
  font-weight: 600;
  text-align: center;
  text-decoration: none;
  font-family: 'Nunito Sans', sans-serif;
  padding: 12px 24px;
  margin: ${(props) => props.margin || ' 0px 20px'};
  border-radius: 50px;
  background: ${({ theme }) => theme.buttonBackground};
  box-shadow: ${({ theme }) => theme.boxShadow};
  height: ${(props) => props.height || ''};
  width: ${(props) => props.width || ''};

  ${(props) => props.hidden && 'hidden'} :focus {
    border: none;
    outline: none;
  }

  &:active {
    background: linear-gradient(145deg, #cacaca, #f0f0f0);
    transform: translateY(2px);
  }

  &:hover {
    background: ${({ theme }) => theme.background};
  }

  @media (max-width: 768px) {
    font-size: 1.5vw;
  }

  @media (max-width: 426px) {
    font-size: 2.5vw;
  }
`;

export const Svg = styled.svg`
  width: 16px;
  height: 16px;

  @media (max-width: 425px) {
    width: 10px;
    height: 10px;
  }

  @media (max-width: 768px) {
    width: 11px;
    height: 11px;
  }
`;
