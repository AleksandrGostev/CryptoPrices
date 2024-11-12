import Layout, { Content } from 'antd/lib/layout/layout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Header } from './components/header/Header';
import { HomePage } from './pages/home/HomePage';
import { ConfigProvider } from 'antd';
import Wrapper from './app.styles';
import { CoinPage } from './pages/coin/CoinPage';

function App() {

  const routes = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />
    },
    {
      path: '/prices/:coinId',
      element: <CoinPage />
    }
  ]);

  return (
    <Wrapper>
      <ConfigProvider
        theme={{
          components: {
            Layout: {
              bodyBg: '#fff'
            }
          }
        }}>
        <Layout>
          <Header />
          <Content>
            <RouterProvider router={routes} />
          </Content>
        </Layout>
      </ConfigProvider>
    </Wrapper>
  );
}

export default App;
