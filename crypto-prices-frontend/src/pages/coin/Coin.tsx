import { Card, InputNumber, Select, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../utils/axios";
import Wrapper from './styles';

const { Text } = Typography;
const { Option } = Select;

export function Coin() {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState<any>({});
  const [compareToList, setCompareToList] = useState<any>([]);
  const [compareTo, setCompareTo] = useState<any>();
  const [inputFrom, setInputFrom] = useState(1);
  const [inputTo, setInputTo] = useState(1);
  const [swapped, setSwapped] = useState(false);


  useEffect(() => {
    init();
  }, [])

  useEffect(() => {
    if (compareTo?.last) {
      onInputFromChange(inputFrom);
    }
  }, [compareTo?.last, swapped]);

  async function init() {
    const response = await axios.get(`/coins/${coinId}`);
    setCoinData(response.data);

    const compareToListResponse = await axios.get(`/coins/${coinId}/compare-list`);
    console.log(compareToListResponse.data);
    setCompareToList(compareToListResponse.data.tradeData);
    setCompareTo(compareToListResponse.data.tradeData[0]);
  }

  function onInputFromChange(value: any) {
    const newValue = value;
    setInputFrom(newValue);
    console.log({ swapped });
    const func = swapped ? divide : times;
    const newToValue = func(newValue, compareTo.last);
    setInputTo(newToValue);
  }

  function onInputToChange(value: any) {
    const newValue = value;
    setInputTo(newValue);
    const func = swapped ? times : divide;
    const newToValue = func(newValue, compareTo.last);
    setInputFrom(newToValue);
  }

  function times(a: number, b: number) {
    return parseFloat((a * b).toFixed(6));
  }

  function divide(a: number, b: number) {
    return parseFloat((a / b).toFixed(6));
  }

  function swap() {
    setInputFrom(inputTo);
    setInputTo(inputFrom);
    setSwapped(prev => !prev);
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
        <Space>
          <InputNumber
            size="large"
            value={inputFrom}
            onChange={onInputFromChange}
            style={{ width: 250 }}
            addonBefore={swapped ? compareTo?.symbol?.toUpperCase() : coinData?.symbol?.toUpperCase()}
          />

          <div className="swap" onClick={swap}>swap</div>

          <InputNumber
            size="large"
            value={inputTo}
            onChange={onInputToChange}
            style={{ width: 250 }}
            addonBefore={
              <Select value={compareTo?.target?.toUpperCase()} style={{ width: 100 }} onChange={(target: string) => {
                const coinData = compareToList.find((c: any) => c.target === target);
                setCompareTo(coinData);
              }} showSearch>
                {compareToList.map((coin: any) => {
                  return <Option key={coin.target} value={coin.target.toUpperCase()}>{coin.target}</Option>
                })}
              </Select>
            }
          />
        </Space>
      </Card>
    </Wrapper>
  );
}
