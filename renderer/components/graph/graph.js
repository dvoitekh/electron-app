import React, { Component } from 'react';
import { Line as LineChart } from 'react-chartjs';
import redis from 'redis';

let client = redis.createClient();

export default class Graph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: {
        labels: [],
        datasets: [
          {
            label: "To do history",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [],
          }
        ]
      },
      chartOptions: { scales: { yAxes: [ { ticks: { beginAtZero: true } } ] } },
      itemsLength: 0
    };
  }

  componentDidMount() {
    let data = [];
    let labels = [];
    client.get('items', (err, response) => {
      const dates = response && JSON.parse(response).map(item => Date.parse(item.date)) || [];
      const [startDate, endDate] = [Math.min(...dates), Math.max(...dates)];
      const SIZE = 8;
      const delta = (endDate - startDate) / SIZE;
      let groups = []; groups.length = SIZE;
      for(let i = 0; i < SIZE; i++) {
        groups[i] = [];
        dates.forEach((date) => {
          if (date >= startDate + delta * i && date <= startDate + delta * (i + 1)) {
            groups[i].push(date);
          }
        });
        labels.push(new Date(startDate + delta * i).toString().slice(0, 25));
      }
      data = groups.map(gr => gr.length);

      let chartData =  {
        labels: labels,
        datasets: [
          {
            label: "To do history",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: data,
          }
        ]
      };

      this.setState({
        chartData: chartData,
        itemsLength: dates.length
      });
    });
  }

  render() {
    return (
      <div>
        {(this.state.itemsLength > 1) ?
          <LineChart data={this.state.chartData} options={this.state.chartOptions} width="450" height="350"/>
          : <h2>No available data</h2>}
      </div>
    );
  }
}
