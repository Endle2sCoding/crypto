import "./App.css";

import { CryptoContextProvider, useCrypto } from "./context/cryptoContext";
import AppLayout from "./components/layout/AppLayout";

import { Spin } from "antd";

function App() {
  const { loading } = useCrypto();
  if (loading) {
    return <Spin fullscreen />;
  }
  return (
    <CryptoContextProvider>
      <AppLayout />
    </CryptoContextProvider>
  );
}

export default App;
