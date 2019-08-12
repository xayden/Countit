import React, { Component } from 'react';

export default class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hours: 0,
      minutes: 0,
      seconds: 0,
      currentTime: 0,
      editing: ''
    };

    this.keys = { ESC: 27, ENTER: 13 };
  }

  componentWillMount() {
    const { hours, minutes, seconds } = this.humanReadableTime(this.props.time);
    this.setState({ currentTime: this.props.time, hours, minutes, seconds });
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isPlaying) {
      this.setState({ currentTime: this.props.time });
    }
  }

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

  start = () => {
    this.timer = setInterval(() => {
      this.setState(prevState => {
        if (prevState.currentTime <= 0) {
          this.props.onFinish(); // react throws an error in the console for this!
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
    if (value.length <= 2 && (typeof Number(value) === 'number' || value === '')) {
      this.setState({ [name]: value });
    }
  };

  handleTimeEdit = name => {
    this.setState({
      editing: name
    });
  };

  handleSaveEdit = async () => {
    const ms = this.state.seconds * 1000 + this.state.minutes * 60 * 1000 + this.state.hours * 60 * 60 * 1000;

    const updatedTimer = { ...this.props.timer, time: ms };
    await this.props.onUpdate(updatedTimer);
    this.setState({ currentTime: ms, editing: '' });
  };

  handleKeyDown = e => {
    if (e.which === this.keys.ESC) {
      this.setState({ editing: '' });
    } else if (e.which === this.keys.ENTER) {
      this.handleSaveEdit();
    }
  };

  render() {
    const { hours, minutes, seconds } = this.humanReadableTime(this.state.currentTime);

    let timerStyle = 'align-self-center';
    this.props.currentPlayingTimer === this.props._id && (timerStyle += ' text-warning');
    this.props.pausedTimer === this.props._id && (timerStyle += ' text-warning paused');

    if (this.props.timer._id === this.props.currentPlayingTimer) {
      document.title = `${hours}:${minutes}:${seconds}`;
    } else if (this.props.timer._id === this.props.pausedTimer) {
      document.title = `PAUSED - ${hours}:${minutes}:${seconds}`;
    }

    return (
      <h3 className={timerStyle}>
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
