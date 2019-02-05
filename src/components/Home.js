import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getRecipeById } from '../utils/recipeAPI';

import { RECIPES_HOME_URI } from '../utils/constantes';

export default class Home extends Component {
  state = {
    recipes: [],
  };

  componentDidMount() {
    this.loadRecipes();
  }

  async loadRecipes() {
    const recipesMapped = RECIPES_HOME_URI.map(uri => {
      return this.getRecipes(uri);
    });
    const recipes = await Promise.all(recipesMapped);
    this.setState({
      recipes: recipes,
    });
  }

  async getRecipes(uri) {
    const { data } = await getRecipeById(uri);
    return data[0];
  }

  render() {
    const recipesList = this.state.recipes.map(({ label, image, uri }) => {
      const recipeId = uri.replace(
        'http://www.edamam.com/ontologies/edamam.owl#recipe_',
        ''
      );
      return (
        <div key={recipeId}>
          <h2>
            <Link to={`/recipe/${recipeId}`}>{label}</Link>
          </h2>
          <img src={image} alt={label} />
        </div>
      );
    });
    return <div>{recipesList}</div>;
  }
}
