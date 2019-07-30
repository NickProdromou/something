import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  clearResults,
  getMoviesByQuery,
  getNextPage,
  getPreviousPage
} from '../../actionCreators';
import {
  getErrorState,
  getLoadingState,
  getMovieItems,
  getPageNumber,
  getSearchTerm,
  getTotalCount,
  showNextPageButton,
  showPreviousPageButton
} from '../../selectors';
import PageNavigation from '../pageNavigation';
import ResultsList from '../resultsList';
import Search from '../search';
import styles from './filterView.module.scss';

export function DumbFilterView({
  onInput,
  clearResults,
  items,
  loading,
  error,
  hasNextPage,
  hasPrevPage,
  pageNumber,
  totalCount,
  getNextPage,
  getPrevPage,
  searchTerm
}) {
  return (
    <div className={styles.Root}>
      <div className={styles.searchContainer}>
        <Search onInput={onInput} clearResults={clearResults} />
      </div>
      <div className={styles.listContainer}>
        <ResultsList results={items} loading={loading} error={error} />
      </div>
      <PageNavigation
        hasNextPage={hasNextPage}
        hasPrevPage={hasPrevPage}
        pageNumber={pageNumber}
        totalCount={totalCount}
        getNextPage={getNextPage}
        getPrevPage={getPrevPage}
        searchTerm={searchTerm}
      />
    </div>
  );
}

DumbFilterView.propTypes = {
  onInput: PropTypes.func.isRequired,
  clearResults: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  hasNextPage: PropTypes.bool.isRequired,
  hasPrevPage: PropTypes.bool.isRequired,
  getNextPage: PropTypes.func.isRequired,
  getPrevPage: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
  totalCount: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    items: getMovieItems(state),
    loading: getLoadingState(state),
    error: getErrorState(state),
    hasNextPage: showNextPageButton(state),
    hasPrevPage: showPreviousPageButton(state),
    totalCount: getTotalCount(state),
    searchTerm: getSearchTerm(state),
    pageNumber: getPageNumber(state)
  };
}

function mapDispatchToProps(dispatch) {
  const boundActionCreators = bindActionCreators(
    {
      onInput: getMoviesByQuery,
      clearResults,
      getNextPage,
      getPrevPage: getPreviousPage
    },
    dispatch
  );

  return {
    ...boundActionCreators
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DumbFilterView);
