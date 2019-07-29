import {
  FETCHING_MOVIES,
  FETCHING_MOVIES_SUCCESS,
  FETCHING_MOVIES_FAILURE
} from '../actions/list';

export const initialState = {
  searchTerm: '',
  items: [],
  totalCount: 0,
  currentpage: 0,
  loadingMovies: false,
  loadingMovieDetail: false,
  listError: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCHING_MOVIES: {
      return { ...state, loadingMovies: true };
    }

    case FETCHING_MOVIES_SUCCESS: {
      const { response, page, searchTerm } = action.payload;

      return {
        ...state,
        loadingMovies: false,
        items: response.Search,
        totalCount: response.totalResults,
        currentPage: page,
        searchTerm
      };
    }

    case FETCHING_MOVIES_FAILURE: {
      const { error } = action.payload;

      console.error({ FETCHING_MOVIES_FAILURE: error });

      return { ...state, loadingMovies: false, items: [], listError: true };
    }

    default:
      return state;
  }
}
