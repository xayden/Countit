import React from 'react';

import Container from './Components/Container';
import Row from './Components/Row';
import TimerWraper from './Components/TimerWraper';
import Controlls from './Components/Controlls';

import * as notification from './notification';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timers: [
        {
          _id: '#5s8ea',
          name: 'Work',
          time: 800000,
          alarmName: 'default'
        },
        {
          _id: '#s9wa8s5',
          name: 'Rest',
          time: 1500000,
          alarmName: 'default'
        }
      ],
      notificationsEnables: false,

      // timer related
      isPlaying: false,
      currentPlayingTimer: '',
      pausedTimer: '',
      finishedTimer: '',

      // wasted time
      wastedTime: 0,
      isWastedTimePaused: true,

      // audio
      audioTimer: 40000,

      // new timer
      isAdding: false,
      name: '',

      // rounds
      rounds: 0
    };
  }

  requestNotificationPermission = () => {
    notification.requestPermission();
    notification.sendNotification('Title', 'Message');
  };

  render() {
    return (
      <Container>
        <Row>
          <Controlls />
        </Row>

        <Row>
          {this.state.timers.map((t, i) => (
            <TimerWraper
              key={t._id}
              _id={t._id}
              idx={i}
              name={t.name}
              time={t.time}
              alarmName={t.alarmName}
            />
          ))}
        </Row>
      </Container>
    );
  }
}

export default App;
