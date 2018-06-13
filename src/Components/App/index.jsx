import React from 'react';
import PropTypes from 'prop-types';
import SearchBox from './SearchBox';
import SearchResults from './SearchResults';
import { connect } from 'react-redux';
import searchWord from './SearchBox/actions';

const App = ({ header, searchWord }) => (
  <div>
    <h1>{header}</h1>
    <SearchBox searchWord={searchWord} />
    <SearchResults />
  </div>
);

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  searchWord,
};

export default connect(
  null,
  mapDispatchToProps,
)(App);
