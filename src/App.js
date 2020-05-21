import React from 'react';
import './App.css';

import TodoHead from "./component/TodoHead";
import TodoBody from "./component/TodoBody"
import TodoFooter from "./component/TodoFooter"

import FilterBody from "./container/FilterBody";

import { Layout } from "antd";

const { Header, Content, Footer } = Layout;

const App = () => (
  <Layout className="App">
    <Header style={{height: "auto"}}>
      <TodoHead/>
    </Header>
    <Content>
      <FilterBody/>
    </Content>
    <Footer>
      <TodoFooter/>
    </Footer>
  </Layout>
);

export default App;
