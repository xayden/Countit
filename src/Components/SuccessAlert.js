import React from 'react';

export default function SuccessAlert(props) {
  if (props.show) {
    return (
      <div className="col-12">
        <div className="">
          <div className="alert alert-success d-flex justify-content-between align-items-center" role="alert">
            A simple success alert—check it out!
            <button className="btn btn-success" onClick={props.playNextTimer}>
              Continue
            </button>
          </div>
        </div>
      </div>
    );
  } else return null;
}
