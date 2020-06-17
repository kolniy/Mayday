import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import redirectUnAuthUser from '../utils/redirectUnAuthUser';

interface Props {
   savedSearch?: any[]
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: '90ch',
      backgroundColor: theme.palette.background.paper,
      padding: '4ch',
      overflowY: 'scroll'
    },
    inline: {
      display: 'block',
    },
  }),
);

const SavedSearch:React.FC<Props> = ({ savedSearch }) => {

    redirectUnAuthUser()

    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const classes = useStyles()

    const handleListItemClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>,
        index: number,
      ) => {
        setSelectedIndex(index);
      };

      const saveSearch = (value:any) => {
        const getItem = savedSearch.find((item) => item.id === value )
        localStorage.setItem('item', JSON.stringify(getItem))
        location.href = '/dashboard'
      }

    return (
    <div>
      <List component="nav" aria-label="secondary mailbox folder" className={classes.root}>
      {savedSearch.length === 0 && <p>No Saved Search</p>}
        {savedSearch.map((search) => {
            return (
              <div className="search-list" key={search.id} onClick={(e:any) => saveSearch(search.id)}>
                <div className="facility-address">
                 <Typography variant="button" display="block" gutterBottom>
                   {search.address}
                 </Typography>
                </div>
                <div className="search-details">
                  <div className="radius">
                  <Typography variant="caption" display="block" gutterBottom>
                      <b>Radius: </b>{search.radius}
                   </Typography>
                  </div>
                  <div className="category">
                  <Typography variant="caption" display="block" gutterBottom>
                      <b>Category: </b>{search.category}
                   </Typography>
                  </div>
                </div>
              </div>
            )
        })}
      </List>
      </div>
    )
}

export { SavedSearch as default }





{/* <ListItem button key={search.id} alignItems="flex-start" onClick={(e) => saveSearch(search.id)}>
<ListItemText
primary={<p><b>Facility Name</b>: {search.name}</p>}
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
    {" "+ search.address}
  </React.Fragment>
}
/>
<ListItemText secondary={
  <React.Fragment>
    <Typography
      component="span"
      variant="body2"
      className={classes.inline}
      color="textPrimary"
    >
      Radius - 
    </Typography>
    {" "+ search.radius}
  </React.Fragment>
} />
 <ListItemText secondary={
  <React.Fragment>
    <Typography
      component="span"
      variant="body2"
      className={classes.inline}
      color="textPrimary"
    >
      Category - 
    </Typography>
    {" "+ search.category}
  </React.Fragment>
} />
</ListItem>
) */}