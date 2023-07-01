import React, { useEffect } from "react";
import { Link, Route, Router, useRoute } from "wouter";
import logo from "../../../assets/groceries.png";
import { palette } from "../../../domain";
import { CreateCategoryForm } from "../components";
import { initStore } from "../store";
import "../variables.scss";
import { Groceries, ItemCRUD, SettingsCRUD } from "../views";
import "./App.scss";

function App() {
  const [match] = useRoute("/groceries");
  useEffect(() => {
    initStore();
  }, []);

  return (
    <Router base="/groceries">
      <div className="App">
        <header
          className="App-header"
          style={{
            backgroundColor: palette.purple,
            color: palette.white,
          }}
        >
          <span>{!match && <Link to="/">⬅️</Link>}</span>
          <span>
            <img src={logo} alt="Groceries" />
          </span>
          <span>
            <Link to="/settings">⚙️</Link>
          </span>
        </header>
        <main className="App-main">
          <Route path="/" component={Groceries} />
          <Route path="/settings" component={SettingsCRUD} />
          <Route path="/items/:id" component={ItemCRUD} />
          <Route path="/categories/create" component={CreateCategoryForm} />
        </main>
      </div>
    </Router>
  );
}

export default App;
