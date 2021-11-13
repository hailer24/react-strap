import "./App.css";
import { Navbar, NavbarBrand } from "reactstrap";
import React from "react";
import Menu from "./components/MenuComponent";

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
          </div>
        </Navbar>
        <Menu />
      </div>
    );
  }
}

export default App;
