import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import styles from './Chat.css';
import Constants from './Constants.js';
import server from './Server';

var socket = server.socket;

class Chat extends Component {
    constructor() {
        super();

        this.state = {
            text: '',
            data: []
        };

        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        var self = this;
        socket.on("chat message", function(data) {
            self.state.data.push(data.message);
            self.setState({
                text: '',
                data: self.state.data
            });
        });
    }

    handleTextChange(event) {
        this.setState({text: event.target.value});
    }

    handleSubmit(event) {
        var self = this;
        socket.emit("chat message", {
            username: "tiennx1",
            message: self.state.text
        });
        event.preventDefault();
    }

    render() {
        var data = this.state.data;
        var text_list = [];
        for (var i = 0; i < data.length; i++) {
            text_list.push(
                <div key={i}>{data[i]}</div>
            );
        }

        return (
            <div className={styles.chat}>
                <div className={styles.contentholder}>
                    {text_list}
                </div>
                <div className={styles.formholder}>
                    <form onSubmit={this.handleSubmit} method="get">
                        <input type="text" name="text" placeholder="say something" value={this.state.text} onChange={this.handleTextChange}/>
                        <input type="submit" value="Send"/>
                    </form>
                </div>
            </div> 
        );
    }
}

export default Chat;