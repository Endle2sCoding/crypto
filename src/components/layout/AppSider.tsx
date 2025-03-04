import { Card, Layout, List, Spin, Statistic, Typography, Tag } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { CSSProperties, useContext } from "react";

import CryptoContext from "../../context/cryptoContext";
import { capitalize } from "../../utils/utils";

const siderStyle: CSSProperties = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#1677ff",
  padding: `1rem`,
};

export default function AppSider() {
  const { loading, assets } = useContext(CryptoContext);
  if (loading) {
    return <Spin fullscreen />;
  }
  return (
    <Layout.Sider
      width="25%"
      style={siderStyle}
    >
      {assets.map((asset) => (
        <Card
          key={asset.id}
          style={{ marginBottom: `1rem` }}
        >
          <Statistic
            title={capitalize(asset.id)}
            value={asset.totalAmount}
            precision={2}
            valueStyle={{ color: asset.grow ? "#3f8600" : "#cf1322" }}
            prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix="$"
          />
          <List
            size="small"
            dataSource={[
              {
                title: "Totla Profit",
                value: asset.totalProfit,
                withTag: true,
              },
              {
                title: "Asset Amount",
                value: asset.amount,
                isPlain: true,
              },
              // {
              //   title: "Diference",
              //   value: asset.growPercent,
              // },
            ]}
            renderItem={(item: {
              title: string;
              value: number;
              withTag?: boolean;
              isPlain?: boolean;
            }) => {
              return (
                <List.Item style={{ padding: `0`, margin: `0` }}>
                  <span>{item.title}</span>
                  {item.withTag && (
                    <Tag color={asset.grow ? "green" : "red"}>
                      {asset.growPercent}%
                    </Tag>
                  )}
                  <span>
                    {item.isPlain ? (
                      item.value
                    ) : (
                      <Typography.Text type={asset.grow ? "success" : "danger"}>
                        {item.value.toFixed(2)}$
                      </Typography.Text>
                    )}
                  </span>
                </List.Item>
              );
            }}
          />
        </Card>
      ))}
    </Layout.Sider>
  );
}
