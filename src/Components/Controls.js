import React, { Component } from 'react';

import * as utils from '../utils';

export default class Controlls extends Component {
  constructor(props) {
    super(props);
    this.state = { alarm: '', isConfirming: false, confirmationTime: 3000 };

    this.audio = React.createRef();
    this.audioInput = React.createRef();
  }

  confirm = () => {
    this.setState({ isConfirming: true });

    this.confirmTime = setInterval(() => {
      if (this.state.confirmationTime <= 0) {
        this.setState({ isConfirming: false, confirmationTime: 3000 });
      } else {
        this.setState(prevState => ({ confirmationTime: prevState.confirmationTime - 1000 }));
      }
    }, 1000);
  };

  handleReset = () => {
    this.setState({ isConfirming: false, confirmationTime: 3000 });
    clearInterval(this.confirmTime);
    this.props.onReset();
  };

  handleInputChange = async e => {
    const value = e.target.checked;
    if (value === true) {
      this.props.requestNotificationPermission();
    } else {
      this.props.disableNotifications();
    }
  };

  handleAudioInputClick = () => {
    this.audioInput.current.click();
  };

  handleAudioChange = () => {
    if (this.audioInput.current.value) {
      this.audio.current.src = URL.createObjectURL(this.audioInput.current.files[0]);
      this.setState({ alarm: utils.truncate(this.audioInput.current.files[0].name, 25) });
    }
  };

  render() {
    return (
      <div className="col-12 col-sm-12 col-md-4 col-lg-3 col-xl-2">
        <div className="row no-gutters rounded mb-2 shadow-sm bg-light">
          <div className="col p-3 d-flex flex-column position-static">
            <h5 className="">Controls</h5>
            {this.props.isPlaying ? (
              <button className="btn btn-success btn-block" onClick={this.props.switchPlayState}>
                {this.props.currentPlayingTimer ? (
                  <React.Fragment>
                    <i className="fas fa-pause mr-1" /> PAUSE
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <i className="fas fa-play mr-1" /> RESUME
                  </React.Fragment>
                )}
              </button>
            ) : (
              <button className="btn btn-success btn-block" onClick={this.props.startPlaying}>
                <i className="fas fa-play mr-1" /> START
              </button>
            )}

            {this.state.isConfirming ? (
              <button
                className="btn btn-danger btn-block py-2"
                id="reset"
                onClick={this.handleReset}
                style={{ fontSize: 10 }}
              >
                <i className="fas fa-exclamation-circle mr-1" />
                CLICK AGAIN TO CONFIRM
              </button>
            ) : (
              <button className="btn btn-danger btn-block" id="reset" onClick={this.confirm}>
                <i className="fas fa-skull-crossbones mr-1" />
                RESET
              </button>
            )}

            <div className="mt-2">
              <div className="form-check">
                {/* Notifications */}
                <input
                  id="notificationCheck"
                  type="checkbox"
                  className="form-check-input"
                  onChange={this.handleInputChange}
                  checked={this.props.isNotificationsEnabled}
                />
                <label className="form-check-label" style={{ fontSize: 14 }} htmlFor="notificationCheck">
                  Notifications
                </label>
              </div>

              {/* Default audio */}
              <input type="file" ref={this.audioInput} onChange={this.handleAudioChange} hidden />
              <audio
                id="audio_default"
                ref={this.audio}
                src={`${process.env.PUBLIC_URL}/alarms/count_the_stars.mp3`}
                loop
              />

              <button
                type="button"
                className="btn btn-secondary btn-block text-left"
                onClick={this.handleAudioInputClick}
              >
                <i className="fas fa-upload mb-1 mr-1" /> Change alarm
              </button>
              <span className="text-muted">
                <small>
                  Default Alarm: <strong>{this.state.alarm || 'Count The Stars'}</strong>
                </small>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
