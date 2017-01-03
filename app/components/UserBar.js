import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import Row from './Row.js';
import Chat from './Chat.js';
import styles from './UserBar.css';
import Constants from './Constants.js';

class Table extends Component {
    constructor(props) {
        super(props);
    }

  render() {
    var createRow = function(rowIndex) {
      return (<Row key={i} index={rowIndex}/>);
    }

    var username = this.props.username;
    var numberOfRow = Constants.height;
    var rows = [];
    for(var i = 0; i < numberOfRow; i++) {
      rows.push(createRow(i));
    }

    return (
        <div className={styles.userbar}>
            {username} 
            <div className={styles.signout}>
                <Link to="/">Sign out</Link>
            </div>
        </div> 
    );
  }
}

export default Table;
