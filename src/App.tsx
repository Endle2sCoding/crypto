import "./App.css";
import { Layout } from "antd";
import AppHeader from "./components/layout/AppHeader";
import AppSider from "./components/layout/AppSider";
import ApContetnt from "./components/layout/ApContetnt";

function App() {
  return (
    <Layout>
      <AppHeader />
      <Layout>
        <AppSider />
        <ApContetnt />
      </Layout>
    </Layout>
  );
}

export default App;
