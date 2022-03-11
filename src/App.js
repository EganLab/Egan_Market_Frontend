import { lazy, Suspense } from 'react';
import { Body } from 'components/Layout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from 'contexts/Theme';
import NavBar from 'components/NavBar';
import { Loading } from 'components/Loading';
import { createBrowserHistory } from 'history';

const history = createBrowserHistory();

const Home = lazy(() => import('pages/Home'));

function App() {
  const { mountedComponent } = useContext(ThemeContext);

  if (!mountedComponent) return <div />;

  return (
    <Router history={history}>
      <NavBar />

      <Body>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route exact path="/" element={<Home />} />
          </Routes>
        </Suspense>
      </Body>
    </Router>
  );
}

export default App;
