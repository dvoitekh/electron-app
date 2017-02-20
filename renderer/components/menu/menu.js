import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Menu extends Component {
  render() {
    return (
      <ul className="main-nav">
        <Link className="menu-item" to="/">Home</Link>
        <Link className="menu-item" to="/graph">Graph</Link>
      </ul>
    );
  }
}
