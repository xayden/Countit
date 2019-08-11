import React from 'react';

import shortid from 'shortid';

import Container from './Components/Container';
import Row from './Components/Row';

import Controlls from './Components/Controlls';
import Rounds from './Components/Rounds';
import WastedTime from './Components/WastedTime';
import SuccessAlert from './Components/SuccessAlert';

import TimerWraper from './Components/TimerWraper';
import Timer from './Components/Timer';
import NewTimer from './Components/NewTimer';

import * as notification from './notification';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timers: [
        // {
        //   _id: '#5s8ea',
        //   name: 'Work',
        //   time: 8000000,
        //   alarm: 'default'
        // },
        // {
        //   _id: '#s9wa8s5',
        //   name: 'Rest',
        //   time: 1500000,
        //   alarm: 'default'
        // }
      ],
      isNotificationsEnabled: false,

      // timer related
      isPlaying: false,
      currentPlayingTimer: 's9wa8s5',
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

  componentWillMount() {
    this.setState({ timers: this.loadLocalStorage() || [] });
  }

  // Notifications
  requestNotificationPermission = async () => {
    const permission = await notification.requestPermission();
    this.setState({ isNotificationsEnabled: permission === 'granted' });
  };

  disableNotifications = () => {
    this.setState({ isNotificationsEnabled: false });
  };

  sendNotification = (title, message) => {
    notification.sendNotification(title, message);
  };

  handleAddTimerClick = () => {
    this.setState({ isAdding: true });
  };

  addTimer = name => {
    const newTimers = [...this.state.timers, { name, _id: shortid.generate(), time: 0, alarm: 'default' }];
    this.setState({ timers: newTimers, name: '', isAdding: false });
    this.updateLocalStorage(newTimers);
  };

  cancelNewTimer = () => {
    this.setState({ isAdding: false });
  };

  updateTimer = newTimer => {
    const oldTimerIdx = this.state.timers.findIndex(t => t._id === newTimer._id);
    const updatedTimers = [
      ...this.state.timers.slice(0, oldTimerIdx),
      newTimer,
      ...this.state.timers.slice(oldTimerIdx + 1)
    ];

    this.setState({ timers: updatedTimers });
    this.updateLocalStorage(updatedTimers);
  };

  deleteTimer = _id => {
    const timerIdx = this.state.timers.findIndex(t => t._id === _id);
    const updatedTimers = [...this.state.timers.slice(0, timerIdx), ...this.state.timers.slice(timerIdx + 1)];

    this.setState({ timers: updatedTimers });
    this.updateLocalStorage(updatedTimers);
  };

  // Timers states
  startPlaying = () => {
    if (this.state.timers[0]) {
      this.setState({ isPlaying: true, currentPlayingTimer: this.state.timers[0]._id });
    }
  };

  pausePlaying = () => {
    this.setState(prevState => ({ currentPlayingTimer: '', pausedTimer: prevState.currentPlayingTimer }));
  };

  resumePlaying = () => {
    this.setState(prevState => ({ currentPlayingTimer: prevState.pausedTimer, pausedTimer: '' }));
  };

  switchPlayState = () => {
    if (this.state.currentPlayingTimer) {
      this.pausePlaying();
    } else {
      this.resumePlaying();
    }
  };

  startNextTimer = () => {
    const nextTimerIdx = this.state.timers.findIndex(t => t._id === this.state.finishedTimer) + 1;
    let updatedState = {};

    if (nextTimerIdx < this.state.timers.length) {
      updatedState = {
        currentPlayingTimer: this.state.timers[nextTimerIdx]._id,
        puasedTimer: '',
        finishedTimer: ''
      };
    } else if (this.state.timers[0]) {
      updatedState = {
        currentPlayingTimer: this.state.timers[0]._id,
        puasedTimer: '',
        finishedTimer: '',
        rounds: this.state.rounds + 1
      };
    }

    this.setState({ ...updatedState, audioTimer: 40000 });
    this.stopAudio();
  };

  onTimerFinish = () => {
    const finishedTimer = this.state.timers.find(t => t._id === this.state.currentPlayingTimer);
    const timerAudio = document.getElementById('audio_' + finishedTimer._id);
    if (timerAudio.src) this.audio = timerAudio;
    else this.audio = document.getElementById('audio_default');

    this.setState(prevState => ({
      currentPlayingTimer: '',
      pausedTimer: '',
      finishedTimer: prevState.currentPlayingTimer
    }));

    if (this.state.isNotificationsEnabled) {
      this.sendNotification('Time up!', `${finishedTimer.name} count down has finished.`);
    }

    this.playAudio();
  };

  // Wasted Time
  startWastedTimer = () => {
    this.wastedTime = setInterval(() => {
      this.setState(prevState => ({ wastedTime: prevState.wastedTime + 1000 }));
    }, 1000);
  };

  pauseWastedTimer = () => {
    clearInterval(this.wastedTime);
    delete this.wastedTime;
    this.setState({ isWastedTimePaused: true });
  };

  resumeWastedTimer = () => {
    if (!this.wastedTime) this.startWastedTimer();
    this.setState({ isWastedTimePaused: false });
  };

  // Audio operations
  playAudio = () => {
    this.audio.play();
    this.audioTime = setInterval(() => {
      if (this.state.audioTimer <= 0) {
        this._stopAudio();
      } else {
        this.setState(prevState => ({ audioTimer: prevState.audioTimer - 1000 }));
      }
    }, 1000);
  };

  stopAudio = () => {
    if (this.audioTime) {
      this.audio.pause();
      this.audio.currentTime = 0;
      clearInterval(this.audioTime);
    }
  };

  // localStorage operations
  loadLocalStorage = () => {
    return JSON.parse(localStorage.getItem('timers'));
  };

  updateLocalStorage = timers => {
    localStorage.setItem('timers', JSON.stringify(timers));
  };

  render() {
    return (
      <Container>
        <Row>
          <SuccessAlert show={this.state.finishedTimer !== ''} playNextTimer={this.startNextTimer} />
          <Controlls
            isPlaying={this.state.isPlaying}
            startPlaying={this.startPlaying}
            switchPlayState={this.switchPlayState}
            currentPlayingTimer={this.state.currentPlayingTimer}
            isNotificationsEnabled={this.state.isNotificationsEnabled}
            requestNotificationPermission={this.requestNotificationPermission}
            disableNotifications={this.disableNotifications}
          />
          <Rounds rounds={this.state.rounds} />
          <WastedTime time={this.state.wastedTime} />
        </Row>

        <Row>
          {this.state.timers.map((t, i) => (
            <TimerWraper
              key={t._id}
              idx={i}
              timer={t}
              onUpdate={this.updateTimer}
              onDelete={this.deleteTimer}
            >
              <Timer
                _id={t._id}
                time={t.time}
                timer={t}
                onFinish={this.onTimerFinish}
                onUpdate={this.updateTimer}
                pausedTimer={this.state.pausedTimer}
                currentPlayingTimer={this.state.currentPlayingTimer}
                pauseWastedTimer={this.pauseWastedTimer}
                resumeWastedTimer={this.resumeWastedTimer}
              />
            </TimerWraper>
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
