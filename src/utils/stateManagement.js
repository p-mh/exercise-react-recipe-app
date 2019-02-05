import { NB_SHOW_RESULTS } from '../utils/constantes';

export const incrementFirstResult = prevState => ({
  firstResult: prevState.firstResult + NB_SHOW_RESULTS,
});
