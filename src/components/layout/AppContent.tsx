import { Layout, Typography } from "antd";
import { useCrypto } from "../../context/cryptoContext";
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
          ?.reduce((acc: number, v?: number) => (acc += v || 1), 0)
          .toFixed(2)}
        %
      </Typography.Title>
      Content
    </Layout.Content>
  );
}
