import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

interface Props {
   searchToRen: any[]
}

const useStyles = makeStyles((theme: Theme) =>
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

const HospitalList:React.FC<Props> = ({ searchToRen }) => {

    const classes = useStyles()
    return (
        <List className={classes.root}>
        {searchToRen.length === 0 && <p>No Search Results For That Location</p>}
        {
          searchToRen.map((details) => {
             return (
               <div key={details.id}>
              <ListItem alignItems="flex-start">
              <ListItemText
                primary={<p><b>Facility Name</b>: {details.name}</p>}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
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
    )
}

export { HospitalList as default }
