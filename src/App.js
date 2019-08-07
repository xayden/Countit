import React from 'react';
import * as notification from './notification';

class App extends React.Component {
  requestNotificationPermission = () => {
    notification.requestPermission();
  };

  render() {
    return (
      <div>
        {notification.supportsNotification() && (
          <button onClick={this.requestNotificationPermission}>Enable Notification</button>
        )}
      </div>
    );
  }
}

export default App;
