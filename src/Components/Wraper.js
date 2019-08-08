import React from 'react';

export default function Wraper(props) {
  return (
    <div class="col-12 col-sm-4 col-md-3 col-lg-3 col-xl-2">
      <div class="row no-gutters rounded mb-4 shadow-sm bg-light ">{props.children}</div>
    </div>
  );
}
