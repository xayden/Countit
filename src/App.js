import React from 'react';

import Timer from './Components/Timer';

import * as notification from './notification';

class App extends React.Component {
  requestNotificationPermission = () => {
    notification.requestPermission();
    notification.sendNotification('Title', 'Message');
  };

  render() {
    return (
      <div className="container-fluid">
        <Timer />
      </div>
    );
  }
}

export default App;
