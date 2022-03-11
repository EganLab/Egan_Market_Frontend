import { AppThemeProvider } from 'contexts/Theme';
import { Web3Provider } from 'contexts/Web3';
import { BackGroundProvider } from 'components/Themes/themes';
import { MessageProvider } from 'contexts/Message';

const Providers = ({ children }) => {
  return (
    <Web3Provider>
      <AppThemeProvider>
        <BackGroundProvider>
          <MessageProvider>{children}</MessageProvider>
        </BackGroundProvider>
      </AppThemeProvider>
    </Web3Provider>
  );
};

export default Providers;
