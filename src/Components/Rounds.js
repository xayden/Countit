import React from 'react';

export default function Rounds(props) {
  return (
    <div className="col-12 col-sm-4 col-lg-3 col-xl-2">
      <div className="rounded overflow-hidden mb-2 shadow-sm bg-light h-150">
        <div className="col p-3 d-flex flex-column position-static text-center">
          <h5 className="mt-n3">Rounds</h5>
          <h3 className="mt-4">{props.rounds}</h3>
        </div>
      </div>
    </div>
  );
}
