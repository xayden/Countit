import React, { Component } from 'react';

export default class TimerWraper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alarmName: 'default',
      time: 0
    };
  }

  componentWillMount() {
    this.setState({
      alarmName: this.props.alarmName,
      time: parseInt(this.props.time)
    });
  }

  render() {
    let seconds = Math.floor((this.state.time / 1000) % 60),
      minutes = Math.floor((this.state.time / (1000 * 60)) % 60),
      hours = Math.floor((this.state.time / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    return (
      <div class="col-12 col-sm-4 col-md-3 col-lg-3 col-xl-2">
        <div class="rounded overflow-hidden mb-4 shadow-sm bg-light">
          <div className="d-flex align-items-start flex-column justify-content-between h-196 p-3">
            <div className="d-flex w-100">
              <h6 className="mr-auto">
                <small className="text-muted">#{this.props.idx + 1}</small> {this.props.name}
              </h6>
              <i className="fas fa-trash text-danger mt-1 cursor" style={{ fontSize: 12 }} />
            </div>

            <h3 className="align-self-center">
              {hours}:{minutes}:{seconds}
            </h3>

            <div className="w-100">
              <button type="button" className="btn btn-secondary btn-block text-left">
                <i className="fas fa-upload mb-1 mr-1" /> Custom alarm
              </button>
              <span className="text-muted">
                <small>
                  Alarm: <strong>{this.state.alarmName}</strong>
                </small>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
