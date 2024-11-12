import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { nFormatter } from "../../utils/helpers";
import { Ticker } from "./types";

type Props = {
  tickers: Ticker[];
  loading: boolean;
}

export function ConversionTable({ tickers, loading }: Props) {
  const columns: ColumnsType<Ticker> = [
    {
      title: 'Pair',
      render: (ticker: Ticker) => `${ticker.base}/${ticker.target}`,
      fixed: 'left'
    },
    {
      title: 'Exchange',
      render: (ticker: Ticker) => <a href={ticker.trade_url} target="_blank">{ticker.market.name}</a>
    },
    {
      title: 'Price',
      dataIndex: 'last',
      render: (price: number) => `$ ${price}`
    },
    {
      title: 'Volume',
      dataIndex: 'volume',
      render: (volume: number) => `$ ${nFormatter(volume, 2)}`
    },
    {
      title: 'Trust score',
      dataIndex: 'trust_score',
      render: (trustScore: string) =>
        <div style={{ backgroundColor: trustScore, width: 15, height: 15, borderRadius: '50%', border: '1px solid #ccc' }} />
    },
    {
      title: 'Is anomaly',
      dataIndex: 'is_anomaly',
      render: (isAnomaly: boolean) => isAnomaly ?
        <CheckCircleOutlined style={{ color: 'green' }} /> : <CloseCircleOutlined style={{ color: 'red' }} />
    },
    {
      title: 'Is stale',
      dataIndex: 'is_stale',
      render: (isAnomaly: boolean) => isAnomaly ?
        <CheckCircleOutlined style={{ color: 'green' }} /> : <CloseCircleOutlined style={{ color: 'red' }} />
    }
  ]
  return <Table rowKey="trade_url" loading={loading} className="conversion-table" scroll={{ x: 1024 }} columns={columns} dataSource={tickers} />
}
