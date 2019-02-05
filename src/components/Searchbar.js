import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { searchRecipesByQuery } from '../utils/recipeAPI';

import { RESET_SEARCH_STATE } from '../utils/constantes';

import { incrementFirstResult } from '../utils/stateManagement';

import {
  SearchOut,
  Search,
  SearchInput,
  SearchButton,
  Results,
  ResultElmt,
  NextBtn,
} from './searchBarStyledComponent';

export default class Searchbar extends Component {
  constructor(props) {
    super(props);
    this.state = RESET_SEARCH_STATE;
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
  onKeyDown = e => {
    if (e.key === 'Enter') {
      this.getRecipes(this.state.inputValue, this.state.firstResult);
    }
    if (e.key === 'Escape') {
      this.setState({
        results: [],
      });
    }
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

  resetState = () => {
    this.setState(RESET_SEARCH_STATE);
  };

  render() {
    const resultsList = this.state.results.map(({ label, uri }) => {
      const recipeId = uri.replace(
        'http://www.edamam.com/ontologies/edamam.owl#recipe_',
        ''
      );
      return (
        <ResultElmt key={recipeId}>
          <Link to={`/recipe/${recipeId}`} onClick={this.resetState}>
            {label}
          </Link>
        </ResultElmt>
      );
    });

    const searchResults = this.state.isLoading ? (
      <Results isLoading>
        <i className="fas fa-spinner fa-spin" />
      </Results>
    ) : (
      <Results>
        {resultsList}
        <NextBtn
          onClick={this.getRecipes.bind(
            this,
            this.state.inputValue,
            this.state.firstResult
          )}
        >
          Next results
        </NextBtn>
      </Results>
    );

    return (
      <SearchOut>
        <Search isResults={this.state.results.length ? true : false}>
          <SearchInput
            type="text"
            onChange={this.onChange}
            value={this.state.inputValue}
            onKeyDown={this.onKeyDown}
            ref={el => (this.elementFocus = el)}
          />
          <SearchButton
            onClick={this.getRecipes.bind(
              this,
              this.state.inputValue,
              this.state.firstResult
            )}
          >
            <i className="fas fa-search" />
          </SearchButton>
        </Search>
        {this.state.results.length ? searchResults : null}
      </SearchOut>
    );
  }
}
