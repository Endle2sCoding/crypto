import { Flex, Typography } from "antd";
import { CryptoType } from "../api";

export default function CoinInfo({
  coin,
  withSymbol,
}: {
  coin: CryptoType;
  withSymbol?: boolean;
}) {
  return (
    <Flex>
      <img
        src={coin.icon}
        alt={coin.name}
        style={{ width: 40, height: 40, marginRight: 10 }}
      />
      <Typography.Title
        level={2}
        style={{ margin: 0 }}
      >
        {withSymbol && <span>({coin.symbol})</span>} {coin.name}
      </Typography.Title>
    </Flex>
  );
}
