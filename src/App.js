import "./App.css";
import { Navbar, NavbarBrand } from "reactstrap";
import React from "react";
import Menu from "./components/MenuComponent";
import { dishes } from "./shared/dishes";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dishes: dishes,
    };
  }
  render() {
    return (
      <div>
        <Navbar dark color="primary">
          <div className="container">
            <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
          </div>
        </Navbar>
        <Menu dishes={this.state.dishes} />
      </div>
    );
  }
}

export default App;
