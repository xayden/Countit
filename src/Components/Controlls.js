import React, { Component } from 'react';

export default class Controlls extends Component {
  render() {
    return (
      <div class="col-12 col-sm-12 col-md-4 col-lg-3 col-xl-2">
        <div class="row no-gutters rounded mb-3 shadow-sm bg-light">
          <div className="col p-3 d-flex flex-column position-static">
            <h5 className="">Controlls</h5>
            <div className="row no-gutters">
              <div className="col-6 col-sm-12 col-lg-12 col-xl-6 p-1">
                {this.props.isPlaying ? (
                  <button className="btn btn-success btn-block" onClick={this.props.switchPlayState}>
                    {this.props.currentPlayingTimer ? (
                      <React.Fragment>
                        <i class="fas fa-pause mr-1" /> PAUSE
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
              </div>
              <div className="col-6 col-sm-12 col-lg-12 col-xl-6 p-1">
                <button className="btn btn-danger btn-block" id="reset">
                  <i className="fas fa-skull-crossbones mr-1" /> RESET
                </button>
              </div>
            </div>

            <div className="mt-2">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="notificationCheck" />
                <label className="form-check-label" style={{ fontSize: 14 }} for="notificationCheck">
                  Notifications
                </label>
              </div>

              <input type="file" name="alarm" hidden="hidden" />
              <button type="button" className="btn btn-secondary btn-block text-left">
                <i className="fas fa-upload mb-1 mr-1" /> Change alarm
              </button>
              <span className="text-muted">
                <small>
                  Default Alarm: <strong>Stars</strong>
                </small>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
