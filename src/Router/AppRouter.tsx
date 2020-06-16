import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import App from '../components/App';
import Login from '../components/Login';
import RecentSearch from '../components/RecentSearch';


const AppRouter = () => {
    return (
        <Router>
        <div>
            <Switch>
           <Route path='/' component={Login} exact={true} />
           <Route path='/dashboard' component={App} />
           <Route path='/RecentSearch' component={RecentSearch} />
           </Switch>
        </div>
        </Router>
    )
}

export { AppRouter as default }