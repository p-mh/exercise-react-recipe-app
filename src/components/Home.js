import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getRecipeById } from '../utils/recipeAPI';

import { RECIPES_HOME_URI } from '../utils/constantes';

import {
  RecipesList,
  Recipe,
  RecipeImg,
  TitleRecipe,
} from './homeStyledComponent';

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
        <Recipe key={recipeId}>
          <Link to={`/recipe/${recipeId}`}>
            <RecipeImg src={image} alt={label} />
            <TitleRecipe>
              <h2>{label}</h2>
            </TitleRecipe>
          </Link>
        </Recipe>
      );
    });
    return <RecipesList>{recipesList}</RecipesList>;
  }
}
