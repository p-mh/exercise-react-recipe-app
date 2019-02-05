import styled from 'styled-components';

export const SearchOut = styled.div`
  margin: auto;
  max-width: 400px;
  position: relative;
`;

export const Search = styled.div`
  display: flex;
  padding: 5px 10px;
  border: #ccc 1px solid;
  border-radius: ${props => (props.isResults ? '16px 16px 0 0' : '16px')};
`;

export const SearchInput = styled.input`
  flex: 2;
  border: none;
  padding: 5px;
`;

export const SearchButton = styled.button`
  border: none;
  background-color: #fff;
`;

export const Results = styled.div`
  position: absolute;
  width: 100%;
  border: #ccc 1px solid;
  box-sizing: border-box;
  background-color: #fff;
  border-top: 0;
  text-align: ${props => (props.isLoading ? 'center' : 'left')};
  font-size: ${props => (props.isLoading ? '2rem' : '1rem')};
  padding: ${props => (props.isLoading ? '5px' : '0')};
  z-index: 1;
`;

export const ResultElmt = styled.p`
  margin: 0;
  padding: 5px;
  &:hover {
    background-color: #dadada;
  }
`;

export const NextBtn = styled.button`
  border: none;
  background-color: #dadada;
  padding: 5px 10px;
  border-radius: 20px;
  margin: 5px;
  float: right;
  cursor: pointer;
  &:hover {
    background-color: #585858;
    color: #fff;
  }
`;
