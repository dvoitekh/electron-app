import React, { Component } from 'react';
import Header from '../components/header/header';
import Menu from '../components/menu/menu';

export default class Layout extends Component {
  getHeader() {
    return this.props.header || (<Header/>);
  }
  getScreen() {
    return this.props.screen || (<div/>);
  }
  getFooter() {
    return this.props.footer || (<Menu/>);
  }
  render() {
    return (
      <div className="page core-layout">
        {this.getHeader()}
        {this.getScreen()}
        {this.getFooter()}
      </div>
    );
  }
}
