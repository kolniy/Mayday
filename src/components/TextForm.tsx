import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '80ch',
      },
    },
  }),
);

const TextForm = () => {
  const classes = useStyles();
  return (
      <TextField id="outlined-basic"  className={classes.root} label="Type to Search" variant="outlined" />
  );
}

export { TextForm as default }