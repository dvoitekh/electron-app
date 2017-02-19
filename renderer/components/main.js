import React from 'react';
import redis from 'redis';

let client = redis.createClient();

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      newItem: ''
    };

    client.lrange('items', 0, -1, (err, items) => {
      this.setState({
        items: items,
      });
    });
  }

  persistData(newItems) {
    this.setState({
      items: newItems,
      newItem: ''
    });

    client.del('items');
    client.rpush.apply(client, ['items'].concat(newItems));
  }

  handleAddition() {
    this.persistData([this.state.newItem, ...this.state.items]);
  }

  handleDeletion(index, e) {
    this.persistData([...this.state.items.slice(0, index), ...this.state.items.slice(index + 1)]);
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
        <input type="button" value="Submit" onClick={this.handleAddition.bind(this)} />
        <ul>
          {this.state.items.map((item, i) => {
            return (
              <li key={i}>
                {item}
                <input type="button" value="Delete" onClick={this.handleDeletion.bind(this, i)} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
