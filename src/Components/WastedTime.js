import React from 'react';

export default function WastedTime(props) {
  let wastedSec = Math.floor((props.time / 1000) % 60),
    wastedMin = Math.floor((props.time / (1000 * 60)) % 60),
    wastedHr = Math.floor((props.time / (1000 * 60 * 60)) % 24);

  wastedHr = wastedHr < 10 ? '0' + wastedHr : wastedHr;
  wastedMin = wastedMin < 10 ? '0' + wastedMin : wastedMin;
  wastedSec = wastedSec < 10 ? '0' + wastedSec : wastedSec;

  return (
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2">
      <div class="rounded overflow-hidden mb-4 shadow-sm bg-danger h-150">
        <div class="col p-3 d-flex flex-column position-static text-center">
          <h5 class="mt-n3">Wasted Time</h5>
          <h3 class="mt-4">
            {wastedHr}:{wastedMin}:{wastedSec}
          </h3>
        </div>
      </div>
    </div>
  );
}
