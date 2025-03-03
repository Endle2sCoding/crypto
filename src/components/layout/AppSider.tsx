import { Card, Layout, List, Spin, Statistic, Typography } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { CSSProperties, useEffect, useState } from "react";
import { AssetType, CryptoType, fakeFetchCrypto, fetchAssets } from "../../api";

const siderStyle: CSSProperties = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#1677ff",
  padding: `1rem`,
};

const data = [
  "Racing car sprays burning fuel into crowd.",
  "Japanese princess to wed commoner.",
  "Australian walks 100km after outback crash.",
  "Man charged over missing wedding girl.",
  "Los Angeles battles huge wildfires.",
];

export default function AppSider() {
  const [loading, setLoading] = useState<boolean>(false);
  const [crypto, setCrypto] = useState<CryptoType[]>([]);
  const [assets, setAssets] = useState<AssetType[]>([]);
  useEffect(() => {
    async function preload() {
      setLoading(true);
      const { result } = await fakeFetchCrypto();
      const assets = await fetchAssets();
      setAssets(
        assets.map((asset) => {
          // const coin = result.find((c) => c.id === asset.id            );
          return { ...asset };
        })
      );
      setCrypto(result);
      setLoading(false);
    }
    preload();
  }, []);
  if (loading) {
    return <Spin fullscreen />;
  }
  return (
    <Layout.Sider
      width="25%"
      style={siderStyle}
    >
      <Card style={{ marginBottom: `1rem` }}>
        <Statistic
          title="Active"
          value={11.28}
          precision={2}
          valueStyle={{ color: "#3f8600" }}
          prefix={<ArrowUpOutlined />}
          suffix="%"
        />

        <List
          size="small"
          dataSource={data}
          renderItem={(item) => (
            <List.Item style={{ padding: `0`, margin: `0` }}>
              <Typography.Text mark>[ITEM]</Typography.Text> {item}
            </List.Item>
          )}
        />
      </Card>
      <Card>
        <Statistic
          title="Idle"
          value={9.3}
          precision={2}
          valueStyle={{ color: "#cf1322" }}
          prefix={<ArrowDownOutlined />}
          suffix="%"
        />
      </Card>
    </Layout.Sider>
  );
}
