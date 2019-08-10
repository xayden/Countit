import React from 'react';

export default function SuccessAlert(props) {
  if (props.show) {
    return (
      <div class="col-12">
        <div class="">
          <div class="alert alert-success d-flex justify-content-between align-items-center" role="alert">
            A simple success alert—check it out!
            <button class="btn btn-success">Continue</button>
          </div>
        </div>
      </div>
    );
  } else return null;
}
