import React from "react";
import { Layout } from "antd";

export class MainLayout extends React.Component<{}, {}> {
  render() {
    return (
      <Layout>
        <div className="main-content">{this.props.children}</div>
      </Layout>
    );
  }
}
