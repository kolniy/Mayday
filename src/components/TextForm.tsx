import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

interface Props{
    text:string,
    changeText?: (text:string) => void
}

const useStyles = makeStyles((theme: Theme) =>
createStyles({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
      minWidth:'50ch'
    },
  },
}),
);

const TextForm:React.FC<Props> = ( { text, changeText } ) => {
    
  const updateTextValue = (value:string) => {
    changeText(value)
  }
    const classes = useStyles()

    return (
        <TextField id="outlined-basic" 
        className={classes.root} 
        value={text} onChange={(e) => updateTextValue(e.target.value)}
         label="Type complete address to see results" variant="outlined"
      />
    )
}

export { TextForm as default }
