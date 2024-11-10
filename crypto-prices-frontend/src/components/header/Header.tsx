import { Header as AntdHeader } from "antd/es/layout/layout";
import Wrapper from './styles';

export function Header() {
  return (
    <Wrapper>
      <AntdHeader>
        <a href="/" className="site-name">CryptoPrices</a>
      </AntdHeader>
    </Wrapper>
  )
}
