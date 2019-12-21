import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Header from "./Components/Header/Header";
import Quotes from "./Containers/Quotes/Quotes";
import AddQuote from "./Containers/AddQuote/AddQuote";
import EditQuote from "./Containers/EditQuote/EditQuote";

import './App.css';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <BrowserRouter>
          <Header />
          <Switch>
            <Route path='/' exact component={Quotes}/>
            <Route path='/add-quote' component={AddQuote}/>
            <Route path='/quotes/:id/edit' component={EditQuote}/>
            <Route render={() => <h2>NOT FOUND</h2>}/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;