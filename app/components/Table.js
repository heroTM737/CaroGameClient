import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import Row from './Row.js';
import Chat from './Chat.js';
import UserBar from './UserBar.js';
import styles from './Table.css';
import Constants from './Constants.js';

class Table extends Component {

  render() {
    var username = this.props.params.username;
    var match_id = this.props.params.match_id;
    var numberOfRow = Constants.height;

    var createRow = function(rowIndex) {
      return (<Row key={i} index={rowIndex} match_id={match_id}/>);
    }
    
    var rows = [];
    for(var i = 0; i < numberOfRow; i++) {
      rows.push(createRow(i));
    }

    return (
      <div>
        <UserBar username={username}/>
        <div className={styles.doubleview}>
          <div className={styles.doubleviewleft}>
            <div className={styles.table}>{rows}</div>
          </div>
          <div className={styles.doubleviewright}>
            <Chat/>
          </div>
        </div>
      </div> 
    );
  }
}

export default Table;
