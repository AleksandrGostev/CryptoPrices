import { Space, Table, Typography } from "antd";
import { ColumnsType } from "antd/lib/table";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import Wrapper from './styles';

type Coin = {
  current_price: number;
  icon: string;
  id: string;
  market_cap: string;
  market_cap_rank: number;
  name: string;
  price_change_24h: number;
  symbol: string;
}

const { Text } = Typography;

export function CurrencyList() {
  const [currencies, setCurrencies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    init();
  }, [])

  async function init() {
    const response = await axios.get('/coins');
    setCurrencies(response.data);
  }

  const columns: ColumnsType<Coin> = [
    {
      title: '#',
      render: (_, __, index) => ++index,
      width: 60
    },
    {
      title: 'Name',
      render: (item: Coin) => <Space>
        <img src={`/icons/${item.icon}.svg`} alt={item.name} className="currency-icon" />
        <Space direction="vertical">
          <Text>{item.name}</Text>
          <Text>{item.symbol.toUpperCase()}</Text>
        </Space>
      </Space>,
      width: 300,
    },
    {
      title: 'Price',
      dataIndex: 'current_price',
      render: (price: number) => `${price} $`,
    },
    {
      title: 'Market cap',
      dataIndex: 'market_cap',
    },
    {
      title: 'Price change 24h',
      dataIndex: 'price_change_24h',
    },
    {
      title: 'Market cap rank',
      dataIndex: 'market_cap_rank',
    }
  ];

  return (
    <Wrapper>
      <Table
        dataSource={currencies}
        columns={columns}
        scroll={{ x: 1024 }}
        rowKey="id"
        onRow={(record: Coin) => {
          return {
            onClick: () => navigate(`/prices/${record.id}`)
          }
        }}
      />
    </Wrapper>
  );
}
