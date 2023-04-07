import React, { useState } from "react";
import SearchCarForm from "./SearchCarForm";
import NewCarRegistryForm from "./NewCarRegistryForm";
import TransferOwnershipForm from "./TransferOwnershipForm";
import { Layout, Menu } from "antd";
import menu from "./constants/menu";
const { Header } = Layout;

function App() {

  //TODO: Will do Connect Wallet work
  
  //State
  const [selectedMenuKey, setSelectedMenuKey] = useState("1");

  //Handler
  const getSelectedMenuComponent = (selectedMenuKey) => {
    switch (selectedMenuKey) {
      case "1":
        return <SearchCarForm />;
      case "2":
        return <NewCarRegistryForm />;
      case "3":
        return <TransferOwnershipForm />;
      default:
        return <SearchCarForm />;
    }
  };

  return (
    <div className="App">
        <Layout className="layout" style={{ height: "100vh" }}>
          <Header>
            <Menu
              theme="light"
              mode="horizontal"
              defaultSelectedKeys={["1"]}
              items={menu}
              onClick={({ key }) => setSelectedMenuKey(key)}
            />
            {getSelectedMenuComponent(selectedMenuKey)}
          </Header>
        </Layout>
    </div>
  );
}

export default App;
