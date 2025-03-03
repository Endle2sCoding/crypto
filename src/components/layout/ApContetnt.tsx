import { Layout } from "antd";
const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: `calc(100vh - 60px)`,
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#001529",
  margin: "0",
  padding: "0",
};

export default function ApContetnt() {
  return <Layout.Content style={contentStyle}>Content</Layout.Content>;
}
