import * as React from "react";
import * as ReactDOM from "react-dom";
// import 'fontsource-roboto'0

import AppRouter from './Router/AppRouter'
import App from './components/App'
import './styles.css'

const Index = () => {
  return <AppRouter />;
};

ReactDOM.render(<Index />, document.getElementById("root"));