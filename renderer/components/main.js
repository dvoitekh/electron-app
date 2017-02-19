import React from 'react';

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: ['hello', 'bye', 'love you'],
      newItem: ''
    };
  }

  handleClick() {
    this.setState({
      items: [this.state.newItem, ...this.state.items],
      newItem: ''
    });
  }

  handleChange(e) {
    this.setState({
      newItem: e.target.value
    });
  }

  render() {
    let divStyle = {textAlign: 'center', padding: '10px 20px'};
    return (
      <div style={divStyle}>
        <input className="" type="text" placeholder="Enter new To Do" value={this.state.newItem} onChange={this.handleChange.bind(this)} />
        <input type="button" value="Submit" onClick={this.handleClick.bind(this)} />
        <ul>
          {this.state.items.map((item, i) => {
            return <li key={i}>{item}</li>;
          })}
        </ul>
      </div>
    );
  }
}
