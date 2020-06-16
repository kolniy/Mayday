import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

interface Props {
    searchRad:any,
    updateRad: (value:number) => void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 180
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

const RadiusForm:React.FC<Props> = ( {searchRad, updateRad } ) => {

    const classes = useStyles()
    const handleUpdate = (value:any) => {
        updateRad(value)
    }
  
      return (
        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-filled-label">Distance Radius</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={searchRad}
          onChange={(e) => { handleUpdate(e.target.value) }}
          className={classes.selectEmpty}
        >
          <MenuItem value={5000}>5000</MenuItem>
          <MenuItem value={10000}>10000</MenuItem>
          <MenuItem value={20000}>20000</MenuItem>
          <MenuItem value={30000}>30000</MenuItem>
          <MenuItem value={40000}>40000</MenuItem>
          <MenuItem value={50000}>50000</MenuItem>
        </Select>
        <FormHelperText>Required</FormHelperText>
      </FormControl>
      )
  }


export { RadiusForm as default }

 