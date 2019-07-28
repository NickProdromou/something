import movieDetailReducer, {
  initialState
} from '../../src/reducers/movieDetail';

describe.only('movieDetail reducer', () => {
  describe('when receiving GET_MOVIE_DETAIL_LOADING action', () => {
    let action;
    let returnedState;

    before(() => {
      action = { type: 'GET_MOVIE_DETAIL_LOADING' };
      returnedState = movieDetailReducer(initialState, action);
    });

    it('returns the state with loadingMovies set to true', () => {
      expect(returnedState).to.deep.eq({
        ...initialState,
        loading: true
      });
    });
  });

  describe('when receiving GET_MOVIE_DETAIL_SUCCESS action', () => {
    let action;
    let returnedState;

    before(() => {
      action = {
        type: 'GET_MOVIE_DETAIL_SUCCESS',
        payload: {
          title: 'the lord of the the rings'
        }
      };
      returnedState = movieDetailReducer(initialState, action);
    });

    it('returns the expected state', () => {
      expect(returnedState).to.deep.eq({
        ...initialState,
        loading: false,
        selectedMovie: action.payload
      });
    });
  });

  describe('when receiving GET_MOVIE_DETAIL_FAILURE action', () => {
    let action;
    let returnedState;

    before(() => {
      action = {
        type: 'GET_MOVIE_DETAIL_FAILURE',
        payload: { error: 'some error' }
      };
      returnedState = movieDetailReducer(initialState, action);
    });

    it('returns the expected state', () => {
      expect(returnedState).to.deep.eq({
        ...initialState,
        loading: false,
        selectedMovieError: true
      });
    });
  });

  describe('when receiving any random action', () => {
    let action;
    let returnedState;

    before(() => {
      action = { type: 'UNKNOWN_ACTION' };
      returnedState = movieDetailReducer(initialState, action);
    });

    it('returns the initial state', () => {
      expect(returnedState).to.deep.eq(initialState);
    });
  });
});
