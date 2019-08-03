import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  typography: {
    padding: theme.spacing(2)
  }
}));

export default function SimplePopper({ open, currentEl, currentEventTitle }) {
  const classes = useStyles();
  return (
    <div>
      <Popper className='pop' open={open} anchorEl={currentEl} transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper>
              <Typography className={classes.typography}>
                {currentEventTitle}
              </Typography>
            </Paper>
          </Fade>
        )}
      </Popper>
    </div>
  );
}
