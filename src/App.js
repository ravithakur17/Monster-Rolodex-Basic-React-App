import { Component } from "react";

import { CardList } from "./Components/card-list/card-list.component";
import { SearchBox } from "./Components/search-box/search-box.components";

import "./App.css";

class App extends Component {
  state = {
    monsters: [],
    searchField: "",
  };

  // two ways of declaring methods : non arrow and arrow method
  // arrow method automatically binds "this" keyword to method
  // non arrow has to be bind in constructor

  // non arrow method
  // handleChange = this.handleChange.bind(this);

  // handleChange(e) {
  //   this.setState({ searchField: e.target.value });
  // }

  // arrow Method
  handleChange = (e) => {
    this.setState({ searchField: e.target.value });
  };

  // Fetching data from API : using life cyccle method
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => this.setState({ monsters: users }));
  }

  render() {
    // Destructuring(as we do not want to modify our state original array)
    const { monsters, searchField } = this.state;
    const filteredMonsters = monsters.filter((monster) =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );
    return (
      <div className="App">
        <h1>Monster Rolodex</h1>
        <SearchBox
          placeholder="Search Monsters"
          // handleChange={(e) => this.setState({ searchField: e.target.value })}
          handleChange={this.handleChange}
        />
        <CardList monsters={filteredMonsters}>
          {/* Childrens are anything between these component element and can be acccessed by props.children  */}
        </CardList>
      </div>
    );
  }
}

export default App;
