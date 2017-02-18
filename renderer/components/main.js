import React from 'react';

export default class Main extends React.Component {
  render() {
    let divStyle = {textAlign: 'center', padding: '10px 20px'};
    let imgStyle = {width: '400px'};
    return (
      <div style={divStyle}>
        <img style={imgStyle} src={'https://s-media-cache-ak0.pinimg.com/originals/7c/ea/d8/7cead8235b46453b0777ef08d8fbd96b.jpg'} />
        <h1>Hello Electron</h1>
      </div>
    );
  }
}
