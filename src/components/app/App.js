import React, { Component } from 'react';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

import CalendarModal from '../calendar-modal';
import SimplePopper from '../popper';

import './App.css';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';

class App extends Component {
  calendarComponentRef = React.createRef();

  state = {
    isOpen: false,
    isPopperOpen: false,
    currentEl: null,
    currentEventTitle: '',
    currentDay: null,
    calendarWeekends: true,
    calendarEvents: [
      { title: 'Event Now', start: new Date(), rendering: 'test title todo' }
    ]
  };

  render() {
    const {
      isOpen,
      isPopperOpen,
      currentDay,
      calendarEvents,
      currentEventTitle,
      currentEl
    } = this.state;
    return (
      <div className='wrapper'>
        <CalendarModal
          isOpen={isOpen}
          cancelAddEvent={this.cancelAddEvent}
          currentDay={currentDay}
          addEvent={this.addEvent}
        />
        <SimplePopper
          open={isPopperOpen}
          currentEl={currentEl}
          currentEventTitle={currentEventTitle}
        />
        <div className='demo-app'>
          <div className='demo-app-top' />
          <div className='demo-app-calendar'>
            <FullCalendar
              defaultView='dayGridMonth'
              header={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
              }}
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              ref={this.calendarComponentRef}
              events={calendarEvents}
              dateClick={this.handleDateClick}
              eventClick={this.handleEventClick}
            />
          </div>
        </div>
      </div>
    );
  }

  handleEventClick = info => {
    this.setState(state => {
      return {
        isPopperOpen: !state.isPopperOpen,
        currentEl: info.el,
        currentEventTitle: info.event.rendering
      };
    });
  };

  handleDateClick = info => {
    this.setState({
      isOpen: true,
      currentDay: info.dateStr
    });
  };

  addEvent = (date, title, time, description) => {
    this.setState({
      isOpen: false,
      calendarEvents: [
        ...this.state.calendarEvents,
        {
          start: `${date} ${time}:00`,
          rendering: description,
          title
        }
      ]
    });
  };

  cancelAddEvent = () => {
    this.setState(state => {
      return { isOpen: !state.isOpen };
    });
  };
}

export default App;
