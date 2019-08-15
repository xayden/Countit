import React from 'react';

export default function WastedTime(props) {
  let wastedSec = Math.floor((props.time / 1000) % 60),
    wastedMin = Math.floor((props.time / (1000 * 60)) % 60),
    wastedHr = Math.floor((props.time / (1000 * 60 * 60)) % 24);

  wastedHr = wastedHr < 10 ? '0' + wastedHr : wastedHr;
  wastedMin = wastedMin < 10 ? '0' + wastedMin : wastedMin;
  wastedSec = wastedSec < 10 ? '0' + wastedSec : wastedSec;

  return (
    <div className="col-12 col-sm-4 col-lg-3 col-xl-2">
      <div className="rounded overflow-hidden mb-2 shadow-sm bg-danger h-150">
        <div className="col p-3 d-flex flex-column position-static text-center">
          <h5 className="mt-n3">Wasted Time</h5>
          <h3 className="mt-4">
            {wastedHr}:{wastedMin}:{wastedSec}
          </h3>
        </div>
      </div>
    </div>
  );
}
