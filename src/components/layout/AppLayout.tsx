import AppHeader from "./AppHeader";
import { Layout } from "antd";
import AppSider from "./AppSider";
import ApContetnt from "./ApContetnt";

const AppLayout = () => {
  return (
    <Layout>
      <AppHeader />
      <Layout>
        <AppSider />
        <ApContetnt />
      </Layout>
    </Layout>
  );
};

export default AppLayout;
