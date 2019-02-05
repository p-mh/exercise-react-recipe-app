import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getRecipeById } from '../utils/RecipeAPI';

const recipesURI = [
  'http://www.edamam.com/ontologies/edamam.owl#recipe_3dc6d568c66a38e2f86d24a055c6de6d',
  'http://www.edamam.com/ontologies/edamam.owl#recipe_040cafa8ae03aea132da9c8b8e419772',
];

export default class Home extends Component {
  state = {
    recipes: [],
  };

  componentDidMount() {
    this.putRecipesInStates();
  }

  async putRecipesInStates() {
    const recipesMapped = recipesURI.map(uri => {
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
    const recipes = this.state.recipes.map(({ label, image, uri }) => {
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
    return <div>{recipes}</div>;
  }
}
