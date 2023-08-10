import React, { useEffect } from "react";
import { MdSettings } from "react-icons/all";
import { BiArrowBack } from "react-icons/bi";
import { Link, Route, Router, useRoute } from "wouter";
import { palette } from "../../../domain";
import { CreateCategoryForm } from "../components";
import { routes } from "../routes";
import { initStore } from "../store";
import "../styles/variables.scss";
import "../styles/form.scss";
import {
  CategoriesView,
  CategoryDetailView,
  Groceries,
  ItemDetails,
  SettingsView,
} from "../views";
import "./App.scss";

function App() {
  const [match] = useRoute(routes.root);
  const goBack = () => window.history.back();
  useEffect(() => {
    initStore();
  }, []);

  return (
    <Router>
      <div className="App">
        <header
          className="App-header"
          style={{
            backgroundColor: palette.purple,
            color: palette.white,
          }}
        >
          <span>
            {!match && (
              <button className="back-history" onClick={goBack}>
                <BiArrowBack size={48} color={palette.white} />
              </button>
            )}
          </span>
          <span className="isotype">
            <Link to={routes.root}>Groceries</Link>
          </span>
          <span>
            <Link to={routes.settings}>
              <MdSettings size={48} color={palette.white} />
            </Link>
          </span>
        </header>
        <main className="App-main">
          <Route path={routes.root} component={Groceries} />
          <Route path={routes.settings} component={SettingsView} />
          <Route path={routes.items.detail} component={ItemDetails} />
          <Route
            path={routes.categories.create}
            component={CreateCategoryForm}
          />
          <Route
            path={routes.categories.detail}
            component={CategoryDetailView}
          />
          <Route path={routes.categories.list} component={CategoriesView} />
        </main>
      </div>
    </Router>
  );
}

export default App;
