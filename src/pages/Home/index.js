import { Pressed, Center } from 'components/Layout';
import styled from 'styled-components';

const ResPessed = styled(Pressed)`
  min-height: 45vh;
  width: 85%;

  @media (max-width: 768px) {
    height: 80vh;
  }

  @media (width: 768px) {
    height: 110vh;
    margin-bottom: 20px;
  }
`;

export default function Home() {
  return (
    <div style={{ position: 'relative' }}>
      <Center>
        <ResPessed />
      </Center>
    </div>
  );
}
