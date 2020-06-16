import * as React from "react";
import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import SavedSearch from './SavedSearch';
import database from '../firestore/firestore';

const RecentSearch = () => {

    const [savedSearch, updateSavedSearch] = useState([])

    const getSearchFromId = () => {
        const uId = localStorage.getItem('userInfo');
        database.collection(`users/${uId}/savedLocation`).get().then((snapshot) => {
            const searchResult:any = []
            snapshot.forEach((childSnapshot) => {
                searchResult.push({
                    id: childSnapshot.id,
                   ...childSnapshot.data()
                })
            })
            updateSavedSearch(searchResult)
        })
    }

    getSearchFromId()

    return (
        <div>
        <Navbar />
        <br /> <br />
     <div className={"content-height"} >
       <React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">
        <Typography variant="h6" gutterBottom> 
            YOUR SAVED SEARCH
        </Typography>
        <Typography variant="body2" gutterBottom>
            Find Some Of Your Recent Searches Below.
      </Typography>
        <SavedSearch savedSearch={savedSearch} />
      </Container>
    </React.Fragment>
    </div>
    </div>
  );
}

export { RecentSearch as default }