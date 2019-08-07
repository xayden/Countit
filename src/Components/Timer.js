import React from 'react';

export default function Timer() {
  return (
    <div className="col-12 col-sm-4 col-md-3 col-lg-3 col-xl-2">
      <div className="rounded overflow-hidden mb-4 shadow-sm bg-light">
        <div className="d-flex align-items-start flex-column justify-content-between h-196 p-3">
          <div className="d-flex w-100">
            <h6 className="mr-auto">
              <small className="text-muted">#1</small> Working too much...
            </h6>
            <i className="fas fa-trash text-danger mt-1 cursor" style={{ fontSize: 12 }} />
          </div>

          <h3 className="align-self-center">00:40:00</h3>

          <div className="w-100">
            <button type="button" className="btn btn-secondary btn-block text-left">
              <i className="fas fa-upload mb-1 mr-1" /> Custom alarm
            </button>
            <span className="text-muted">
              <small>
                Alarm: <strong>Default</strong>
              </small>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
