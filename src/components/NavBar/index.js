import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Burger from './Burger';

const Header = styled.header`
  min-height: 135px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: white;
  z-index: 1;
`;

const Left = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0px 8vw;
`;

export default function NavBar() {
  return (
    <Header>
      <Left>
        <Link to="/">Logo</Link>
      </Left>
      <Burger />
    </Header>
  );
}
