import React, { useEffect } from "react";
import { Link, Route, Router, useRoute } from "wouter";
import logo from "../../../assets/groceries.png";
import { palette } from "../../../domain";
import { CreateCategoryForm } from "../components";
import { routes } from "../routes";
import { initStore } from "../store";
import "../variables.scss";
import { CategoriesView, Groceries, ItemCRUD, SettingsView } from "../views";
import "./App.scss";

function App() {
  const [match] = useRoute(routes.baseRoute);
  useEffect(() => {
    initStore();
  }, []);

  return (
    <Router base={routes.baseRoute}>
      <div className="App">
        <header
          className="App-header"
          style={{
            backgroundColor: palette.purple,
            color: palette.white,
          }}
        >
          <span>{!match && <Link to={routes.root}>⬅️</Link>}</span>
          <span>
            <img src={logo} alt="Groceries" />
          </span>
          <span>
            <Link to={routes.settings}>⚙️</Link>
          </span>
        </header>
        <main className="App-main">
          <Route path={routes.root} component={Groceries} />
          <Route path={routes.settings} component={SettingsView} />
          <Route path={routes.items.detail} component={ItemCRUD} />
          <Route
            path={routes.categories.create}
            component={CreateCategoryForm}
          />
          <Route path={routes.categories.list} component={CategoriesView} />
        </main>
      </div>
    </Router>
  );
}

export default App;
