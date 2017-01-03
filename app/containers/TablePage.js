// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Table from '../components/Table';
import * as CounterActions from '../actions/counter';

function mapStateToProps(state) {
  return {
    counter: state.table
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CounterActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);
