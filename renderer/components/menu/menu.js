import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Menu extends Component {
  render() {
    return (
      <div className="nav-container">
        <div className="fake-nav"></div>
        <ul className="main-nav">
          <Link className="menu-item" to="/" activeClassName="active">Home</Link>
          <Link className="menu-item" to="/graph" activeClassName="active">Graph</Link>
        </ul>
      </div>
    );
  }
}
