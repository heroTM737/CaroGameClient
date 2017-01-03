import React, {Component, PropTypes} from 'react';
import styles from './Table.css';
import Constants from './Constants.js';
import server from './Server';

var socket = server.socket

class Cell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "",
            match_id: props.match_id,
            turnState: "locked"
        };

        this.handleClick = this.handleClick.bind(this);

        var rowIndex = props.rowIndex;
        var colIndex = props.colIndex;
        var self = this;
        socket.on("match turn", function(data) {
            if (data.x == rowIndex && data.y == colIndex) {
                self.setState({
                    value: data.icon
                });
            }
        });

        socket.on("turn locked", function(data) {
            self.setState({
                turnState: "locked"
            });
        });

        socket.on("turn free", function(data) {
            self.setState({
                turnState: "free"
            });
        });
  
    }

    handleClick() {
        if (this.state.turnState == "free") {
            var rowIndex = this.props.rowIndex;
            var colIndex = this.props.colIndex;
            console.log("rowIndex=" + rowIndex + " colIndex=" + colIndex);
            if (this.state.value === "") {
                console.log("emmitting x="+colIndex);
                socket.emit("match turn", {
                    x: rowIndex,
                    y: colIndex,
                    match_id: this.state.match_id
                });
            }
        } else {
            console.log("turn locked");
        }
    }

    render() {
        return ( 
            <div className={styles.cell + " " + styles.noselect} onClick={this.handleClick}>{this.state.value}</div>
        );
    }
}

export default Cell;
