import { Layout, Typography } from "antd";
import { useCrypto } from "../../context/cryptoContext";
import PortfolioChart from "../PortfolioChart";
import AssetsTable from "./AssetsTable";
const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: `calc(100vh - 60px)`,
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#001529",
  margin: "0",
  padding: "0",
};

export default function AppContent() {
  const { assets, crypto } = useCrypto();
  // const cryptoPriceMap = crypto.reduce(
  //   (acc: AssetsStateType[], c: CryptoType) => {
  //     if (c.id) {
  //       acc[c.id] = c.price;
  //     }
  //     return acc;
  //   },
  //   {}
  // );
  return (
    <Layout.Content style={contentStyle}>
      <Typography.Title
        level={3}
        style={{ textAlign: "left", color: "#fff" }}
      >
        Portfolio:
        {assets
          .map((asset) => {
            const coin = crypto!.find((c) => c.id === asset.id);
            if (coin) {
              return asset.amount * coin.price;
            }
          })
          .reduce((acc: number, v?: number) => (acc += v || 0), 0)
          .toFixed(2)}
        $
      </Typography.Title>
      <PortfolioChart />
      <AssetsTable />
    </Layout.Content>
  );
}
