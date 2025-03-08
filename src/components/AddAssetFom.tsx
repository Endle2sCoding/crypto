import {
  Button,
  DatePicker,
  Divider,
  Form,
  InputNumber,
  Result,
  Select,
  Space,
} from "antd";
import { useRef, useState } from "react";
import { useCrypto } from "../context/cryptoContext";
import { AssetType, CryptoType } from "../api";
import CoinInfo from "./CoinInfo";

const validateMessages = {
  required: "${label} is Required!",
  types: {
    number: "${label} is not valid number",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};
export default function AddAssetFom({ onClose }: { onClose: () => void }) {
  const [form] = Form.useForm();
  const { crypto } = useCrypto();
  const [coin, setCoin] = useState<CryptoType | null | undefined>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  console.log("submitted", submitted);
  const assetRef = useRef({});

  if (submitted) {
    <Result
      status="success"
      title="You Asset Added"
      subTitle={`Added ${assetRef.current.amount} of ${
        coin && coin.name
      } by price ${assetRef.current.price}`}
      extra={[
        <Button
          type="primary"
          key="console"
          onClick={onClose}
        >
          Go Console
        </Button>,
        <Button key="buy">Buy Again</Button>,
      ]}
    />;
  }
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
  function onFinish<Type>(values: {
    amount: number;
    price: number;
    total: number;
    date: Type;
  }) {
    console.log("onFinish values", values);
    const newAsset = {
      id: coin && coin.id,
      amoint: values.amount,
      price: values.price,
      date: values.date?.$d ?? new Date(),
    };
    assetRef.current = newAsset;
    setSubmitted(true);
  }
  function handleAmountChange<Type>(value: Type) {
    const price = form.getFieldValue("price");
    form.setFieldsValue({
      total: +((value as number) * price).toFixed(2),
    });
  }
  function handlePriceChange<Type>(value: Type) {
    const amount = form.getFieldValue("amount");
    form.setFieldsValue({
      total: +(amount * (value as number)).toFixed(2),
    });
  }
  return (
    <Form
      form={form}
      validateMessages={validateMessages}
      name="basic"
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 10,
      }}
      style={{ maxWidth: 600 }}
      initialValues={{
        price: +coin.price.toFixed(2),
      }}
      onFinish={onFinish}
    >
      <CoinInfo coin={coin} />
      <Divider />

      <Form.Item
        label="Amount"
        name="amount"
        rules={[
          {
            type: "number",
            required: true,
            min: 0,
          },
        ]}
      >
        <InputNumber
          type="number"
          style={{ width: "100%" }}
          placeholder="Enter coin amount"
          onChange={handleAmountChange}
        />
      </Form.Item>

      <Form.Item
        label="Price"
        name="price"
      >
        <InputNumber
          type="number"
          onChange={handlePriceChange}
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
