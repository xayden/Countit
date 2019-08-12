import React, { Component } from 'react';

import * as utils from '../utils';

export default class TimerWraper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alarm: 'default',
      time: 0,
      editing: false,
      name: ''
    };

    this.input = React.createRef();
    this.audio = React.createRef();
    this.audioInput = React.createRef();

    this.keys = { ESC: 27, ENTER: 13 };
  }

  componentWillMount() {
    this.setState({
      name: this.props.timer.name,
      alarm: this.props.timer.alarm
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.currentPlayingTimer !== this.state._id &&
      this.props.currentPlayingTimer === this.state._id
    ) {
      this.resume();
    } else if (
      prevProps.currentPlayingTimer === this.state._id &&
      this.props.currentPlayingTimer !== this.state._id
    ) {
      this.pause();
    } else if (!prevState.editing && this.state.editing) {
      const node = this.input.current;
      node.focus();
      node.select();
    }
  }

  handleTitleEdit = () => {
    this.setState({ editing: true });
  };

  handleChange = e => {
    this.setState({ name: e.target.value });
  };

  saveEdit = () => {
    const updatedTimer = { ...this.props.timer, name: this.state.name };
    this.setState({ editing: false });
    this.props.onUpdate(updatedTimer);
  };

  handleKeyDown = e => {
    if (e.which === this.keys.ESC) {
      this.setState({ editing: false, name: this.props.timer.name });
    } else if (e.which === this.keys.ENTER) {
      this.saveEdit();
    }
  };

  // Audio handling
  handleAudioInputClick = () => {
    this.audioInput.current.click();
  };

  handleAudioChange = () => {
    if (this.audioInput.current.value) {
      this.audio.current.src = URL.createObjectURL(this.audioInput.current.files[0]);
      this.setState({ alarm: utils.truncate(this.audioInput.current.files[0].name, 35) });
    }
  };

  render() {
    return (
      <div className="col-12 col-sm-4 col-lg-3 col-xl-2">
        <div className="rounded overflow-hidden mb-2 shadow-sm bg-light">
          <div className="d-flex align-items-start flex-column justify-content-between h-196 p-3">
            <div className="d-flex w-100">
              <h6 className="mr-auto">
                <small className="text-muted">#{this.props.idx + 1} </small>
                {this.state.editing ? (
                  <input
                    ref={this.input}
                    name="name"
                    type="text"
                    value={this.state.name}
                    className="text-dark title-input"
                    onChange={this.handleChange}
                    onKeyDown={this.handleKeyDown}
                    onBlur={this.saveEdit}
                  />
                ) : (
                  <span onClick={this.handleTitleEdit} className="h6">
                    {this.props.timer.name}
                  </span>
                )}
              </h6>

              <i
                className="fas fa-trash text-danger mt-1 cursor"
                style={{ fontSize: 12 }}
                onClick={() => this.props.onDelete(this.props.timer._id)}
              />
            </div>

            {this.props.children}

            <div className="w-100">
              <input type="file" ref={this.audioInput} onChange={this.handleAudioChange} hidden />
              <audio id={'audio_' + this.props.timer._id} ref={this.audio} loop />

              <button
                type="button"
                className="btn btn-secondary btn-block text-left"
                onClick={this.handleAudioInputClick}
              >
                <i className="fas fa-upload mb-1 mr-1" /> Custom alarm
              </button>
              <span className="text-muted">
                <small>
                  Alarm: <strong>{this.state.alarm}</strong>
                </small>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
