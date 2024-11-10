import Layout, { Content } from 'antd/es/layout/layout';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Header } from './components/header/Header';
import { HomePage } from './pages/home/HomePage';
import { ConfigProvider } from 'antd';
import Wrapper from './app.styles';
import { Coin } from './pages/coin/Coin';

function App() {

  const routes = createBrowserRouter([
    {
      path: '/',
      element: <HomePage />
    },
    {
      path: '/prices/:coinId',
      element: <Coin />
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