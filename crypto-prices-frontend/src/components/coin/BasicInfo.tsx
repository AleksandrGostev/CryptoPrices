import { Descriptions, DescriptionsProps } from "antd"
import { nFormatter } from "../../utils/helpers";
import { CoinData } from "./types";

type Props = {
  coinInfo: CoinData;
}

export function BasicInfo({ coinInfo }: Props) {
  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: 'Current price',
      children: `$ ${coinInfo.current_price}`,
    },
    {
      key: '4',
      label: 'Price change 24h',
      children: `$ ${coinInfo.price_change_24h}`,
    },
    {
      key: '3',
      label: 'Markt cap rank',
      children: coinInfo.market_cap_rank,
    },
    {
      key: '2',
      label: 'Market cap',
      children: `$ ${nFormatter(parseInt(coinInfo.market_cap, 10), 2)}`,
    },
  ];

  return <Descriptions bordered items={items} />
}
