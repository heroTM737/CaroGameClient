import React, {Component, PropTypes} from 'react';
import Cell from './Cell.js';
import styles from './Table.css';
import Constants from './Constants.js';

class Row extends Component {

  render() {
    var match_id = this.props.match_id;
    var rowIndex = this.props.index;
    var numberOfCell = Constants.width;
    var cells = [];
    for(var i = 0; i < numberOfCell; i++) {
      cells.push(<Cell key={i} rowIndex={rowIndex} colIndex={i} match_id={match_id}/>);
    }
    return ( 
      <div className={styles.row}>{cells}</div>
    );
  }
}

export default Row;
