import { Button, Drawer, Layout, Modal } from "antd";
import { CSSProperties, useEffect, useState } from "react";
import { Select, Space } from "antd";
import { useCrypto } from "../../context/cryptoContext";
import CoinInfoModal from "../CoinINfoModal";
import { CryptoType } from "../../api";
import AddAssetFom from "../AddAssetFom";

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
  const [drawer, setDrawer] = useState<boolean>(true);
  const [coin, setCoin] = useState<CryptoType | null | undefined>(null);
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

    setCoin(crypto.find((c) => c.id == value));
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
      <Button
        onClick={() => setDrawer(true)}
        type="primary"
      >
        Add Asset
      </Button>
      <Modal
        open={modal}
        onCancel={() => setModal(false)}
        footer={null}
      >
        {coin && <CoinInfoModal coin={coin} />}
      </Modal>
      <Drawer
        destroyOnCloseeeeee
        width={600}
        title="Basic Drawer"
        onClose={() => setDrawer(false)}
        open={drawer}
      >
        <AddAssetFom />
      </Drawer>
    </Layout.Header>
  );
}
