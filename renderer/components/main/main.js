import React from 'react';
import redis from 'redis';
import { remote } from 'electron';

let client = redis.createClient();
const dialog = remote.dialog;

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
      newItem: { text: '', date: '', id: undefined }
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
      newItem: { text: '', date: '', id: undefined }
    });

    client.del('items');
    client.rpush.apply(client, ['items'].concat(newItems.map(item => JSON.stringify(item))));
  }

  handleAddition() {
    let newItem = { text: this.state.newItem.text, date: this.state.newItem.date, id: this.state.items.length + 1 };
    this.persistData([newItem, ...this.state.items]);
    new Notification('Success', { title: "Success", body: `To Do '${this.state.newItem.text}' has been added` });
  }

  handleDeletion(index, e) {
    let confirmed = dialog.showMessageBox({
                        type: 'question',
                        buttons: ['Yes', 'No'],
                        title: 'Confirm',
                        message: 'Are you sure you want to quit?'
                    });
    if (confirmed) { return false }
    this.persistData([...this.state.items.slice(0, index), ...this.state.items.slice(index + 1)]);
    new Notification('Success', { title: "Success", body: `To Do '${this.state.items[index].text}' has been deleted` });
  }

  handleTextChange(e) {
    this.setState({
      newItem: { text: e.target.value, date: this.state.newItem.date, id: undefined }
    });
  }

  handleDateChange(e) {
    this.setState({
      newItem: { text: this.state.newItem.text, date: e.target.value, id: undefined }
    });
  }

  render() {
    return (
      <div className="todo-list">
        <input type="text" placeholder="Enter new To Do" value={this.state.newItem.text} onChange={this.handleTextChange.bind(this)} />
        <input type="text" placeholder="Enter Date" value={this.state.newItem.date} onChange={this.handleDateChange.bind(this)} />&nbsp;
        <input type="button" value="Submit" onClick={this.handleAddition.bind(this)} />
        <ul>
          {this.state.items.map((item, i) => {
            return (
              <li key={i}>
                <strong>text:</strong> {item.text}, <strong>date:</strong> {item.date}&nbsp;
                <input type="button" value="Delete" onClick={this.handleDeletion.bind(this, i)} />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
