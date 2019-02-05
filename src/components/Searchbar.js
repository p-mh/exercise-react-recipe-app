import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { searchRecipesByQuery } from '../utils/RecipeAPI';

const incrementFirstResult = (prevState, prevProps) => ({
  firstResult: prevState.firstResult + 10,
});

const RESET_STATE = {
  inputValue: '',
  results: [],
  firstResult: 0,
  isLoading: false,
};

export default class Searchbar extends Component {
  constructor(props) {
    super(props);
    this.state = RESET_STATE;
    this.elementFocus = null;
  }
  componentDidMount() {
    this.elementFocus.focus();
  }
  onChange = ({ target: { value: inputValue } }) => {
    this.setState({
      inputValue,
    });
  };

  getRecipes(query, firstResult = 0) {
    return this.setState(
      {
        isLoading: true,
      },
      async () => {
        const {
          data: { hits },
        } = await searchRecipesByQuery(query, firstResult);
        const results = hits.map(({ recipe }) => recipe);
        this.setState(incrementFirstResult);
        this.setState({
          results,
          isLoading: false,
        });
      }
    );
  }

  resetDatas = () => {
    this.setState(RESET_STATE);
  };

  render() {
    const resultsList = this.state.results.map(({ label, uri }) => {
      const recipeId = uri.replace(
        'http://www.edamam.com/ontologies/edamam.owl#recipe_',
        ''
      );
      return (
        <p key={recipeId}>
          <Link to={`/recipe/${recipeId}`} onClick={this.resetDatas}>
            {label}
          </Link>
        </p>
      );
    });

    const searchResults = this.state.isLoading ? (
      <div>Loading</div>
    ) : (
      <div>
        {resultsList}
        <button
          onClick={this.getRecipes.bind(
            this,
            this.state.inputValue,
            this.state.firstResult
          )}
        >
          Next results
        </button>
      </div>
    );

    return (
      <div>
        <input
          type="text"
          onChange={this.onChange}
          value={this.state.inputValue}
          ref={el => (this.elementFocus = el)}
        />
        <button
          onClick={this.getRecipes.bind(
            this,
            this.state.inputValue,
            this.state.firstResult
          )}
        >
          Search
        </button>
        {this.state.results.length ? searchResults : null}
      </div>
    );
  }
}
