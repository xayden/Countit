import React, { Component } from 'react';
import Wraper from './Wraper';

export default class Controlls extends Component {
  render() {
    return (
      <Wraper>
        <div class="col p-3 d-flex flex-column position-static">
          <h5 class="">Controlls</h5>
          <div class="row no-gutters">
            <div class="col-6 col-sm-12 col-lg-12 col-xl-6 p-1">
              <button class="btn btn-success btn-block">
                <i class="fas fa-play mr-1" /> RESUME
              </button>
            </div>
            <div class="col-6 col-sm-12 col-lg-12 col-xl-6 p-1">
              <button class="btn btn-danger btn-block" id="reset">
                <i class="fas fa-skull-crossbones mr-1" /> RESET
              </button>
            </div>
          </div>

          <div class="mt-2">
            <div class="form-check">
              <input class="form-check-input" type="checkbox" id="notificationCheck" />
              <label class="form-check-label" style={{ fontSize: 14 }} for="notificationCheck">
                Notifications
              </label>
            </div>

            <input type="file" name="alarm" hidden="hidden" />
            <button type="button" class="btn btn-secondary btn-block text-left">
              <i class="fas fa-upload mb-1 mr-1" /> Change alarm
            </button>
            <span class="text-muted">
              <small>
                Default Alarm: <strong>Stars</strong>
              </small>
            </span>
          </div>
        </div>
      </Wraper>
    );
  }
}
