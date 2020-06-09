import * as React from "react";
import { useState, useEffect } from 'react';
import axios from 'axios'
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Navbar from './Navbar'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';


export interface IAppProps {
}

const useStyles1 = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '80ch',
      },
    },
  }),
);

const useStyles2 = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

const useStyles3 = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: '60ch',
      backgroundColor: theme.palette.background.paper,
      maxHeight:'50ch',
      padding: '4ch',
      overflowY: 'scroll'
    },
    inline: {
      display: 'block',
    },
  }),
);

const App = (props: IAppProps ) => {

    const [ searchText, updateText ] = useState('');
    const [ coordinatesObj, updateCoord ] = useState({lat:0, lng:0});
    const [ searchResults, updateSearchResults ] = useState([]);
    const [ searchRadius, updateSearchRadius ] = useState(5000);
    const [searchToRender, updateRender ] = useState([])

    const updateSearch = (text:string) => {
        updateText(text)
        getCordinates(text)
    }

    const updateRadius = (radius:any) => {
        updateSearchRadius(radius)
    }

    const getCordinates = (search:string) => {
       axios.request({
           method: 'get',
           url:`https://maps.googleapis.com/maps/api/geocode/json?address=${search}&key=AIzaSyA3ixrfQoLyuIfLA0WRg_mfllQuC-lWHnA`
       }).then((response) => {
           const locationCoordinates = (response.data.results[0].geometry.location)
            updateCoord({
               lat:locationCoordinates.lat,
               lng:locationCoordinates.lng
            })
       }).catch((err) => {
           console.log(err)
       })
    }

    const getNearbyHospitals = () => {
        const { lat, lng } = coordinatesObj
        const proxyurl = "https://cors-anywhere.herokuapp.com/";
        const apiurl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${searchRadius}&type=hospital&key=AIzaSyA3ixrfQoLyuIfLA0WRg_mfllQuC-lWHnA`
        return axios.request({
            method:'get',
            url: proxyurl + apiurl
        }).then((response) => {
            const searchArray = response.data.results
            updateSearchResults(searchArray)
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
       getNearbyHospitals()
    }, [coordinatesObj])

    useEffect(() => {
      getNearbyHospitals()
    }, [searchRadius])

    useEffect(() => {
  
        updateRender(searchResults)
    }, [searchResults])

    const classes1 = useStyles1();
    const classes2 = useStyles2();
    const classes3 = useStyles3();

  return (
      <div>
        <Navbar />
        <br /> <br />
      <React.Fragment>
      <CssBaseline />
      <Container fixed>
          <div>
          <TextField id="outlined-basic" value={searchText} onChange={(e) => updateSearch(e.target.value) }  className={classes1.root} label="Type complete address to see results" variant="outlined" />
          <FormControl required className={classes2.formControl}>
        <InputLabel id="demo-simple-select-filled-label">Radius</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={searchRadius}
          onChange={(e) => { updateRadius(e.target.value) }}
          className={classes2.selectEmpty}
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
      <List className={classes3.root}>
        {searchResults.length === 0 && <p>No Search Results For That Location</p>}
        {
          searchToRender.map((details) => {
             return (
               <div key={details.id}>
              <ListItem alignItems="flex-start">
              <ListItemText
                primary={<p><b>Hospital Name</b>: {details.name}</p>}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes3.inline}
                      color="textPrimary"
                    >
                      Complete Address - 
                    </Typography>
                    {" "+ details.vicinity}
                  </React.Fragment>
                }
              />
            </ListItem>
            </div>
             )
            })
        }
    </List>
    </div>
      </Container>
    </React.Fragment>
    </div>
  );
}

export { App as default }
