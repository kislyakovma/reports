import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from "./Config/routes.js";
import { AuthProvider } from "./Context/index";
import AppRoute from "./Components/AppRoute";
import { ConfigProvider } from "antd";
import ruRU from "antd/lib/locale/ru_RU";

function App(props) {
  return (
    <AuthProvider>
      <ConfigProvider locale={ruRU}>
        <Router>
          <Switch>
            {routes.map((route) => (
              <AppRoute
                key={route.path}
                path={route.path}
                component={route.component}
                isPrivate={route.isPrivate}
              />
            ))}
          </Switch>
        </Router>
      </ConfigProvider>
    </AuthProvider>
  );
}

export default App;
