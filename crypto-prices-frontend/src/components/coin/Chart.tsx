import { Line } from "@ant-design/charts";

type Props = {
  data: any;
}

export function Chart({ data }: Props) {
  const props = {
    data,
    xField: 'time',
    yField: 'price'
  }

  return data ? <Line {...props} /> : null;
}
