import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import request from 'request';
import styles from './Home.css';
import server from './Server';

var socket = server.socket;

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };

    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUsernameChange(event) {
    this.setState({username: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  handleSubmit(event) {
    var username = this.state.username;
    var password = this.state.password;

    socket.on('connect', function(){
      console.log("connected");
    });

    socket.emit("login", {
      username: username,
      password: password
    });

    socket.on("login", function(status) {
      console.log(status);
      if (status == "Successful") {
        hashHistory.push("/findmatch/" + username);
      } else {
        console.log("log in failed");
      }
    });

    // var options = {
    //   url:'http://127.0.0.1:7000/login', 
    //   form: {
    //     username: username,
    //     password: password
    //   }
    // }

    // request.post(options, function(err, httpResponse, body) {
    //   if (err) {
    //     //so something if error
    //     console.log(err);
    //   } else {
    //     console.log(body);
    //     if (body == "Successful") {
    //       hashHistory.push("/table/" + username);
    //     }
    //   }
    // });

    event.preventDefault();
  }

  render() {
    return (
      <div>
        <div className={styles.container}>
          <div className={styles.title}>Arcsight Tic <i className="fa fa-heartbeat" aria-hidden="true"></i> Toe Tournament </div>
            <form onSubmit={this.handleSubmit} method="get">
                <div className={styles.row}><input type="text" name="username" placeholder="Username" value={this.state.username} onChange={this.handleUsernameChange}/></div>
                <div className={styles.row}><input type="text" name="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange}/></div>
                <div className={styles.row}><input type="submit" value="Dive in"/></div>
            </form>
        </div>
      </div>
    );
  }
}
