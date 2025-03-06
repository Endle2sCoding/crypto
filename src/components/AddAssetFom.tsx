import { Button, Checkbox, Divider, Flex, Form, Input, Select, Space, Typography } from "antd";
import { useState } from "react";
import { useCrypto } from "../context/cryptoContext";
import { CryptoType } from "../api";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

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
  return (
    <Form action="#">
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
      <Form.Item<FieldType>
      label="Username"
      name="username"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item<FieldType> name="remember" valuePropName="checked" label={null}>
      <Checkbox>Remember me</Checkbox>
    </Form.Item>

    <Form.Item label={null}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
    </Form>
  );
}
