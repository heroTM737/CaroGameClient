import React, {Component, PropTypes} from 'react';
import UserBar from './UserBar.js';
import styles from './FindMatch.css';
import Constants from './Constants.js';
import server from './Server';
import { hashHistory } from 'react-router';

var socket = server.socket;

class FindMatch extends Component {

  constructor(props) {
      super(props);
      this.state = {
          users: [],
          source: null,
          target: null,
          requesting: false,
          accepting: false,
          starting: false,
          match_id: null
      }

      this.handleRequestMatch = this.handleRequestMatch.bind(this);
      this.handleAcceptMatch = this.handleAcceptMatch.bind(this);
      this.requestMatch = this.requestMatch.bind(this);
  }

  componentDidMount() {
      var self = this;

      socket.emit("find match", {});

      socket.on("find match", function(data) {
          self.setState({
              users: data.users
          });
      });

      socket.on("request match", function(data) {
          self.setState({
              source: data.source,
              accepting: true,
              match_id: data.match_id
          });

          socket
      });

      socket.on("accept match", function(data) {
          hashHistory.push("/table/" + self.props.username + "/" + data.match_id);
      });
  }

  handleRequestMatch(event) {
      var target = event.target.getAttribute("data-value");
      var self = this;
      console.log("target = " + target);
      this.setState({
          target: target,
          requesting: true
      }, () => self.requestMatch());
  }

  requestMatch() {
      console.log(this.state);
      var username = this.props.username;
      var target = this.state.target;
      var self = this;

      console.log("requesting match from " + username + " to " + target);

      socket.emit("request match", {
          username: username,
          target: target
      });
  }

  handleAcceptMatch(event) {
      var match_id = event.target.getAttribute("data-value");
      var self = this;
      console.log("accepted match from " + this.state.source);
      this.setState({
          requesting: false,
          starting: true
      }, () => {
          socket.emit("accept match", {match_id: match_id});
      });
  }

  render() {
      var online_users = [];
      var users = this.state.users;
      var username = this.props.username;

      for (var key in users) {
          online_users.push(
              <div key={key} className={styles.row} onClick={this.handleRequestMatch} data-value={users[key]}>{users[key]}</div>
          );
      }

      var requestStyle = {display: "none"};
      var acceptStyle = {display: "none"};
      var startStyle = {display: "none"};
      if (this.state.requesting) {
          requestStyle.display = "block";
      }
      if (this.state.accepting) {
          acceptStyle.display = "block";
      }
      if (this.state.starting) {
          startStyle.display = "block";
      }
      
      return (
          <div>
            <UserBar username={username}/>
            <div style={startStyle} className={styles.row}>starting match</div>
            <div style={acceptStyle} className={styles.row} data-value={this.state.match_id} onClick={this.handleAcceptMatch}>
                {this.state.source} request to play with you, click here to accept
            </div>
            <div style={requestStyle} className={styles.row}>waiting for {this.state.target} to accept</div>
            <div>{online_users}</div>
          </div>
      );
  }
}

export default FindMatch;