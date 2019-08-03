import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import './calendar-modal.css';

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
    width: 220,
    backgroundColor: theme.palette.background.paper,
    borderRadius: 5,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 4),
    outline: 'none'
  },
  button: {
    margin: theme.spacing(1)
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200
  }
}));

const initialState = {
  eventName: '',
  eventTime: '',
  eventDescription: ''
};

const CalendarModal = ({ isOpen, cancelAddEvent, currentDay, addEvent }) => {
  const classes = useStyles();

  const [{ eventName, eventTime, eventDescription }, setState] = useState(
    initialState
  );

  const clearState = () => {
    setState({ ...initialState });
  };
  const handleSubmit = e => {
    e.preventDefault();
    addEvent(currentDay, eventName, eventTime, eventDescription);
    clearState();
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  return (
    <Modal open={isOpen}>
      <div className={classes.paper}>
        <form onSubmit={handleSubmit}>
          <TextField
            id='eventname'
            required
            label='Event name'
            margin='normal'
            name='eventName'
            value={eventName}
            className={classes.textField}
            onChange={handleChange}
          />
          <TextField
            id='description'
            required
            label='Event description'
            margin='normal'
            name='eventDescription'
            value={eventDescription}
            className={classes.textField}
            onChange={handleChange}
          />
          <TextField
            required
            id='time'
            label='Event time'
            type='time'
            name='eventTime'
            margin='normal'
            className={classes.textField}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true
            }}
            inputProps={{
              step: 300
            }}
          />
          <div className='btn-group'>
            <Button
              variant='contained'
              color='secondary'
              className={classes.button}
              onClick={cancelAddEvent}
            >
              Cancel
            </Button>
            <Button
              variant='contained'
              color='primary'
              className={classes.button}
              type='submit'
            >
              Apply
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default CalendarModal;
