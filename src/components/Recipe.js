import React, { Component } from 'react';
import { getRecipeById } from '../utils/recipeAPI';

export default class Recipe extends Component {
  state = {
    recipe: {},
    isLoading: true,
  };
  componentDidMount() {
    this.getRecipe(this.props.match.params.recipeId);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.recipeId !== this.props.match.params.recipeId) {
      this.setState({
        isLoading: true,
      });
      this.getRecipe(this.props.match.params.recipeId);
    }
  }

  async getRecipe(uri) {
    const completeURI = `http://www.edamam.com/ontologies/edamam.owl#recipe_${uri}`;
    const { data } = await getRecipeById(completeURI);
    this.setState({
      recipe: data[0],
      isLoading: false,
    });
  }

  render() {
    const { label, image, ingredientLines } = this.state.recipe;
    const ingredients = ingredientLines
      ? ingredientLines.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))
      : null;

    return this.state.isLoading ? (
      <div>Loading</div>
    ) : (
      <div>
        <h2>{label}</h2>
        <img src={image} alt={label} />
        <ul>{ingredients}</ul>
      </div>
    );
  }
}
