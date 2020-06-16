import * as React from "react";
import { useState, useEffect } from 'react';
import axios from 'axios'
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import datebase from '../firestore/firestore'
import Navbar from './Navbar';
import TextForm from './TextForm';
import RadiusForm from './RadiusForm';
import HospitalList from './HospitalList';
import CategoryForm from './CategoryForm';
import redirectUnAuthUser from '../utils/redirectUnAuthUser';

const App = () => {

    const [ searchText, updateText ] = useState('');
    const [ coordinatesObj, updateCoord ] = useState({lat:0, lng:0});
    const [ searchResults, updateSearchResults ] = useState([]);
    const [ searchRadius, updateSearchRadius ] = useState(5000);
    const [searchToRender, updateRender ] = useState([]);
    const [searchCategory, updateCategory] = useState('hospital');

    redirectUnAuthUser()

    const checkItemAndPopulate = () => {
        const item = JSON.parse(localStorage.getItem('item'))
        if(item){
            updateSearchRadius(item.radius)
            updateText(item.address)
            updateCategory(item.category)
           localStorage.removeItem('item')
        }
    }

    checkItemAndPopulate()

    const updateSearch = (text:string) => {
        updateText(text)
        getCordinates(text)
    }

    const updateRadius = (radius:any) => {
        updateSearchRadius(radius)
    }

    const updateCategoryData = (value:string) => {
        updateCategory(value)
    }

    const saveSearch = () => {  
        if(searchText.length === 0){
            return alert('Search Text cannot be empty')
        }
        const uid = localStorage.getItem('userInfo')
        
        const searchQuery = {
            'address': searchText,
            'radius': searchRadius,
            'category': searchCategory,
        }
        datebase.collection(`users/${uid}/savedLocation`).add(searchQuery).then(() => {
            alert('saved succesfully')
        }).catch((err) => {
            alert(`Error adding document ${err.message}`)
        })
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
        const apiurl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${searchRadius}&type=${searchCategory}&key=AIzaSyA3ixrfQoLyuIfLA0WRg_mfllQuC-lWHnA`
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

    useEffect(() => {
      getNearbyHospitals()
    }, [searchCategory])

  return (
      <div>
        <Navbar />
        <br /> <br />
     <div className={"content-height"} >
       <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
      <TextForm text={searchText} changeText={updateSearch} />
      <RadiusForm searchRad={searchRadius} updateRad={updateRadius} />
      <CategoryForm category={searchCategory} updateCat={updateCategoryData} />
      <Button variant="contained" onClick={saveSearch} color="primary">
            Save This Search.
        </Button> 
        <br/> <br />
      <HospitalList searchToRen={searchToRender} /> 
      </Container>
    </React.Fragment>
    </div>
    </div>
  );
}

export { App as default }
