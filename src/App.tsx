import * as React from "react";
import { Provider } from "react-redux";

import "antd/dist/antd.css";
import Dashboard from "./Components/Dashboard/Dashboard";
import Header from "./Components/Header/Header";

import store from "./store";

import "./App.css";

export default class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Header logo="http://www.stickpng.com/assets/images/580b57fcd9996e24bc43c39a.png" />
          <Dashboard />
        </div>
      </Provider>
    );
  }
}
