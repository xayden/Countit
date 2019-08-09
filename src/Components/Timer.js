import React, { Component } from 'react';

export default class Timer extends Component {
  constructor(props) {
    super(props);

    const { hours, minutes, seconds } = this.humanReadableTime(this.props.time);

    this.state = {
      hours,
      minutes,
      seconds,
      currentTime: this.props.time,
      editing: ''
    };
  }

  start = () => {
    this.timer = setInterval(() => {
      this.setState(prevState => {
        if (prevState.currentTime <= 0) {
          this.props.onTimerFinish(); // react throws an error in the console for this!
          this.setState({ currentTime: this.props.time });
          return this.pause();
        } else {
          return { currentTime: prevState.currentTime - 1000 };
        }
      });
    }, 1000);
  };

  pause = () => {
    clearInterval(this.timer);
    delete this.timer;
    this.props.resumeWastedTimer();
  };

  resume = () => {
    if (!this.timer) this.start();
    this.props.pauseWastedTimer();
  };

  humanReadableTime = ms => {
    let seconds = Math.floor((ms / 1000) % 60),
      minutes = Math.floor((ms / (1000 * 60)) % 60),
      hours = Math.floor((ms / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    return { hours, minutes, seconds };
  };

  handleChange = e => {
    const { name, value } = e.target;
    if (value.length < 3 && (Number(value) || value === '')) {
      this.setState({ [name]: value });
    }
  };

  handleTimeEdit = name => {
    this.setState({
      editing: name
    });
  };

  handleSaveEdit = () => {
    const ms = this.state.seconds * 1000 + this.state.minutes * 60 * 1000 + this.state.hours * 60 * 60 * 1000;
    const { hours, minutes, seconds } = this.humanReadableTime(ms);

    this.setState({ currentTime: ms, editing: '', hours, minutes, seconds });
  };

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.editing && this.state.editing) {
      const node = document.getElementById(this.state.editing);
      node.focus();
      node.select();
    } else if (
      prevProps.currentPlayingTimer !== this.props._id &&
      this.props.currentPlayingTimer === this.props._id
    ) {
      this.resume();
    } else if (
      prevProps.currentPlayingTimer === this.props._id &&
      this.props.currentPlayingTimer !== this.props._id
    ) {
      this.pause();
    }
  }

  render() {
    const { hours, minutes, seconds } = this.humanReadableTime(this.state.currentTime);
    return (
      <h3
        className={
          this.props.currentPlayingTimer === this.props._id
            ? 'align-self-center text-warning'
            : 'align-self-center'
        }
      >
        {this.state.editing === 'hours' ? (
          <input
            id="hours"
            name="hours"
            type="text"
            className="h3 text-dark text-center timer-input"
            value={this.state.hours}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}
            onBlur={this.handleSaveEdit}
          />
        ) : (
          <span onClick={() => this.handleTimeEdit('hours')}>{hours}</span>
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
            onBlur={this.handleSaveEdit}
          />
        ) : (
          <span onClick={() => this.handleTimeEdit('minutes')}>{minutes}</span>
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
            onBlur={this.handleSaveEdit}
          />
        ) : (
          <span onClick={() => this.handleTimeEdit('seconds')}>{seconds}</span>
        )}
      </h3>
    );
  }
}
