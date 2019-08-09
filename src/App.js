import React from 'react';

import Container from './Components/Container';
import Row from './Components/Row';
import TimerWraper from './Components/TimerWraper';
import Controlls from './Components/Controlls';
import NewTimer from './Components/NewTimer';

import * as notification from './notification';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timers: [
        {
          _id: '#5s8ea',
          name: 'Work',
          time: 8000000,
          alarm: 'default'
        },
        {
          _id: '#s9wa8s5',
          name: 'Rest',
          time: 1500000,
          alarm: 'default'
        }
      ],
      notificationsEnabled: false,

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

      // rounds
      rounds: 0
    };
  }

  requestNotificationPermission = () => {
    notification.requestPermission();
    notification.sendNotification('Title', 'Message');
  };

  handleAddTimerClick = () => {
    this.setState({ isAdding: true });
  };

  addTimer = name => {
    const newTimers = [...this.state.timers, { name, _id: '123', time: 0, alarm: 'default' }];
    this.setState({ timers: newTimers });
    this.setState({ name: '', isAdding: false });
  };

  cancelNewTimer = () => {
    this.setState({ isAdding: false });
  };

  render() {
    return (
      <Container>
        <Row>
          <Controlls />
        </Row>

        <Row>
          {this.state.timers.map((t, i) => (
            <TimerWraper key={t._id} _id={t._id} idx={i} name={t.name} time={t.time} alarm={t.alarm} />
          ))}
          <NewTimer
            isAdding={this.state.isAdding}
            handleAddTimerClick={this.handleAddTimerClick}
            addTimer={this.addTimer}
            cancelNewTimer={this.cancelNewTimer}
          />
        </Row>
      </Container>
    );
  }
}

export default App;
