import React, { Component } from 'react';

export default class Timer extends Component {
  constructor(props) {
    super(props);

    let seconds = Math.floor((this.props.time / 1000) % 60),
      minutes = Math.floor((this.props.time / (1000 * 60)) % 60),
      hours = Math.floor((this.props.time / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;

    this.state = {
      hours,
      minutes,
      seconds,
      editing: ''
    };
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleTimeEdit = name => {
    this.setState({
      editing: name
    });
  };

  componentDidUpdate(preProps, prevState) {
    if (!prevState.editing && this.state.editing) {
      const node = document.getElementById(this.state.editing);
      node.focus();
      node.select();
    }
  }

  render() {
    return (
      <h3 className="align-self-center">
        {this.state.editing === 'hours' ? (
          <input
            id="hours"
            name="hours"
            type="text"
            className="h3 text-dark text-center timer-input"
            value={this.state.hours}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            onBlur={() => this.setState({ editing: '' })}
          />
        ) : (
          <span onClick={() => this.handleTimeEdit('hours')}>{this.state.hours}</span>
        )}
        :
        {this.state.editing === 'minutes' ? (
          <input
            id="minutes"
            name="minutes"
            type="text"
            className="h3 text-dark text-center timer-input"
            value={this.state.minutes}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            onBlur={() => this.setState({ editing: '' })}
          />
        ) : (
          <span onClick={() => this.handleTimeEdit('minutes')}>{this.state.minutes}</span>
        )}
        :
        {this.state.editing === 'seconds' ? (
          <input
            id="seconds"
            name="seconds"
            type="text"
            className="h3 text-dark text-center timer-input"
            value={this.state.seconds}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            onBlur={() => this.setState({ editing: '' })}
          />
        ) : (
          <span onClick={() => this.handleTimeEdit('seconds')}>{this.state.seconds}</span>
        )}
      </h3>
    );
  }
}
