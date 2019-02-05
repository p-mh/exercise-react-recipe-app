import styled from 'styled-components';

export const RecipesList = styled.div`
  display: flex;
  justify-content: center;
`;

export const Recipe = styled.div`
  flex: 1 1 30%;
  margin: 20px;
  position: relative;
`;

export const RecipeImg = styled.img`
  width: 100%;
`;

export const TitleRecipe = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  background-color: #333333c2;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
`;
