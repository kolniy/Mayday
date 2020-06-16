import * as React from "react";
import { Link as RouterLink } from 'react-router-dom';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { firebase } from '../firestore/firestore'


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

const Navbar = () => {
    const classes = useStyles();

    const Logout = () => {
      localStorage.removeItem('userInfo')
      firebase.auth().signOut().then(function() {
        // Sign-out successful.
      }).catch(function(error) {
        // An error happened.
      });
    }

    return (
        <div className={classes.root}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h4" className={classes.title}>
                MAYDAY
              </Typography>
              <Typography variant="h6">
               FIND HEALTH CARE FACILITIES NEAR YOU
              </Typography>
            </Toolbar>
          </AppBar>
          <div className="navbar-buttons">
          <Button color="primary" component={RouterLink} to="/dashboard">
            Create Search
          </Button>
          <Button color="primary" component={RouterLink} to="/RecentSearch">
            View Saved Search
          </Button>
          <Button className="float-right" color="primary" onClick={Logout} component={RouterLink} to="/">
            Logout
          </Button>
          </div>
        </div>
      );
}

export { Navbar as default }