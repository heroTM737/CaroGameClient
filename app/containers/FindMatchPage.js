// @flow
import React, { Component } from 'react';
import FindMatch from '../components/FindMatch';

export default class FindMatchPage extends Component {
  render() {
    var username = this.props.params.username;
    return (
      <FindMatch username={username}/>
    );
  }
}