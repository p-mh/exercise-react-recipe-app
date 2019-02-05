import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import Searchbar from './components/Searchbar';
import Home from './components/Home';
import Recipe from './components/Recipe';

import { AppContent, Title } from './appStyledComponent';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <AppContent>
          <Title>
            <Link to="/">Recipe App</Link>
          </Title>
          <Searchbar />
          <Route exact path="/" component={Home} />
          <Route exact path="/recipe/:recipeId" component={Recipe} />
        </AppContent>
      </BrowserRouter>
    );
  }
}

export default App;
