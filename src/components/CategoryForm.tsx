import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

interface Props {
    category:any,
    updateCat: (value:any) => void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

const CategoryForm:React.FC<Props> = ( {category, updateCat} ) => {

    const classes = useStyles()
    const handleUpdate = (value:any) => {
        updateCat(value)
    }
  
      return (
        <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-filled-label">Choose a search Category</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={category}
          onChange={(e) => { handleUpdate(e.target.value) }}
          className={classes.selectEmpty}
        >
          <MenuItem value={"hospital"}>Hospital</MenuItem>
          <MenuItem value={"pharmacy"}>Pharmacy</MenuItem>
          <MenuItem value={"drugstore"}>Clinics</MenuItem>
          <MenuItem value={"doctor"}>Medical Offices</MenuItem>
        </Select>
        <FormHelperText>Required</FormHelperText>
      </FormControl>
      )
  }


export { CategoryForm as default }

