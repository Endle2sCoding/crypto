import { Button, Layout, Modal } from "antd";
import { CSSProperties, useEffect, useState } from "react";
import { Select, Space } from "antd";
import { useCrypto } from "../../context/cryptoContext";

const headerStyle: CSSProperties = {
  width: `100%`,
  textAlign: "center",
  height: 60,
  display: `flex`,
  justifyContent: "space-between",
  alignItems: "center",
};

export default function AppHeader() {
  const [select, setSelect] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);
  const { crypto } = useCrypto();

  useEffect(() => {
    const keypress = (event: KeyboardEvent) => {
      if (event.key === "/") {
        setSelect((prev) => !prev);
      }
    };
    document.addEventListener("keypress", keypress);
    return () => document.removeEventListener("keypress", keypress);
  }, []);

  const handleSelect = (value: string) => {
    console.log(value);
    setModal(true);
  };

  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{ width: 250 }}
        open={select}
        onSelect={handleSelect}
        onClick={() => setSelect((prev) => !prev)}
        value={"press / to open"}
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
      <Button type="primary">Add Asset</Button>
      <Modal
        open={modal}
        onCancel={() => setModal(false)}
        footer={null}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </Layout.Header>
  );
}
