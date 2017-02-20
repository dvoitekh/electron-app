import React from 'react';
import redis from 'redis';

let client = redis.createClient();

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      newItem: { text: '', id: undefined }
    };

    client.lrange('items', 0, -1, (err, items) => {
      this.setState({
        items: items.map(item => JSON.parse(item))
      });
    });
  }

  persistData(newItems) {
    this.setState({
      items: newItems,
      newItem: { text: '', id: undefined }
    });

    client.del('items');
    client.rpush.apply(client, ['items'].concat(newItems.map(item => JSON.stringify(item))));
  }

  handleAddition() {
    let newItem = { text: this.state.newItem.text, id: this.state.items.length + 1 };
    this.persistData([newItem, ...this.state.items]);
  }

  handleDeletion(index, e) {
    this.persistData([...this.state.items.slice(0, index), ...this.state.items.slice(index + 1)]);
  }

  handleChange(e) {
    this.setState({
      newItem: { text: e.target.value, id: undefined }
    });
  }

  render() {
    return (
      <div className="todo-list">
        <input type="text" placeholder="Enter new To Do" value={this.state.newItem.text} onChange={this.handleChange.bind(this)} />
        <input type="button" value="Submit" onClick={this.handleAddition.bind(this)} />
        <ul>
          {this.state.items.map((item, i) => {
            return (
              <li key={i}>
                {item.text}
                <input type="button" value="Delete" onClick={this.handleDeletion.bind(this, i)} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
