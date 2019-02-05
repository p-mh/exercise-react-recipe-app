import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';

import Searchbar from './components/Searchbar';
import Home from './components/Home';
import Recipe from './components/Recipe';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Link to="/">
            <h1>Recipe App</h1>
          </Link>
          <Searchbar />
          <Route exact path="/" component={Home} />
          <Route exact path="/recipe/:recipeId" component={Recipe} />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
