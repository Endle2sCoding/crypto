import {
  Button,
  DatePicker,
  Divider,
  Flex,
  Form,
  InputNumber,
  Select,
  Space,
  Typography,
} from "antd";
import { useState } from "react";
import { useCrypto } from "../context/cryptoContext";
import { CryptoType } from "../api";

export default function AddAssetFom() {
  const { crypto } = useCrypto();
  const [coin, setCoin] = useState<CryptoType | null | undefined>(null);
  if (!coin) {
    return (
      <Select
        style={{ width: "100%" }}
        onSelect={(v) => {
          setCoin(crypto?.find((c) => c.id === v));
        }}
        placeholder="Select coin"
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img
              style={{ width: 20 }}
              src={option.data.icon}
              alt={option.data.label}
            />
            {option.data.label}
          </Space>
        )}
      />
    );
  }
  // { amount: 2132; price: 12313; total: number }
  function onFinish(values: any) {
    console.log("onFinish values", values);
  }
  return (
    <Form
      name="basic"
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 10,
      }}
      style={{ maxWidth: 600 }}
      initialValues={{}}
      onFinish={onFinish}
    >
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
          {coin.name}
        </Typography.Title>
      </Flex>
      <Divider />

      <Form.Item
        label="Amount"
        name="amount"
        rules={[
          {
            type: "number",
            required: true,
            min: 0,
            message: "Please input your amount!",
          },
        ]}
      >
        <InputNumber style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item
        label="Price"
        name="price"
      >
        <InputNumber
          disabled
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item
        label="Data & Tine"
        name="date"
      >
        <DatePicker
          showTime
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item
        label="Total"
        name="total"
      >
        <InputNumber
          disabled
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item label={null}>
        <Button
          type="primary"
          htmlType="submit"
        >
          Add Asset
        </Button>
      </Form.Item>
    </Form>
  );
}
