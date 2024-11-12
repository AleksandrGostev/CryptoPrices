import { Card, InputNumber, Select, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BasicInfo } from "../../components/coin/BasicInfo";
import { Chart } from "../../components/coin/Chart";
import { ConversionTable } from "../../components/coin/ConversionTable";
import { CoinData, Ticker } from "../../components/coin/types";
import axios from "../../utils/axios";
import Wrapper from './styles';

const { Text } = Typography;
const { Option } = Select;

export function CoinPage() {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState<CoinData>();
  const [compareToList, setCompareToList] = useState<Ticker[]>([]);
  const [compareTo, setCompareTo] = useState<Ticker>();
  const [inputFrom, setInputFrom] = useState(1);
  const [inputTo, setInputTo] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [chartData, setChartData] = useState<any>();

  useEffect(() => {
    init();
  }, [])

  useEffect(() => {
    if (compareTo?.last) {
      onInputFromChange(inputFrom);
    }
  }, [compareTo?.last]);

  async function init() {
    setIsLoading(true);
    const response = await axios.get(`/coins/${coinId}`);
    setCoinData(response.data);

    const tickersResponse = await axios.get(`/coins/${coinId}/tickers`);
    setCompareToList(tickersResponse.data.tickers);
    setCompareTo(tickersResponse.data.tickers[0]);
    setChartData(tickersResponse.data.prices);
    setIsLoading(false);
  }

  function onInputFromChange(value: number | null) {
    const newValue = value ?? 1;
    setInputFrom(newValue);
    setInputTo(newValue * (compareTo?.last || 1));
  }

  function onInputToChange(value: number | null) {
    const newValue = value ?? 1;
    setInputTo(newValue);
    setInputFrom(newValue / (compareTo?.last || 1));
  }

  function addonBeforeTarget() {
    return (
      <Select
        value={compareTo?.target?.toUpperCase() === coinData?.symbol.toUpperCase() ? compareTo?.base : compareTo?.target}
        style={{ width: 100 }}
        onChange={(target: string) => {
          const compareToItem = compareToList.find((c: Ticker) => c.trade_url === target);
          setCompareTo(compareToItem);
        }}
        showSearch
      >
        {compareToList.map((coin: Ticker) => {
          const target = coin.target === coinData?.symbol.toUpperCase() ? coin.base : coin.target;
          return <Option key={coin.trade_url} value={coin.trade_url}>{target}</Option>
        })}
      </Select>
    )
  }

  if (!coinData) {
    return null;
  }

  return (
    <Wrapper>
      <Card title={
        <Space>
          <img src={`/icons/${coinData.icon}.svg`} alt={coinData.name} className="currency-icon" />
          <Text className="name">{coinData.name}</Text>
          <Text className="symbol">({coinData.symbol?.toUpperCase()})</Text>
        </Space>

      }>
        <BasicInfo coinInfo={coinData} />
        <Chart data={chartData} />
        <ConversionTable tickers={compareToList} loading={isLoading} />

        <div className="inputs-wrapper">
          <InputNumber
            size="large"
            value={inputFrom}
            onChange={onInputFromChange}
            style={{ width: 250 }}
            addonBefore={coinData?.symbol?.toUpperCase()}
          />

          <div>{`<->`}</div>
          <InputNumber
            size="large"
            value={inputTo}
            onChange={onInputToChange}
            style={{ width: 250 }}
            addonBefore={addonBeforeTarget()}
          />
        </div>
      </Card>
    </Wrapper>
  );
}
