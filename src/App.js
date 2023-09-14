import React, { Component } from 'react'
import NavBar from './componants/NavBar'
import News from './componants/News'
import { BrowserRouter as Router, Switch, Route } from  "react-router-dom";


export default class App extends Component {
  apiKey=process.env.REACT_APP_NEWS_API;
  render() {
    return (
      <div>
        <Router>
        <NavBar/>
        <Switch> 
        <Route exact path="/"><News key="1" apiKey={this.apiKey} pageSize={9} country="in" category="general"/></Route>
        <Route exact path="/business"><News key="2" apiKey={this.apiKey} pageSize={9} country="in" category="business"/></Route>
        <Route exact path="/entertainment"><News key="3" apiKey={this.apiKey} pageSize={9} country="in" category="entertainment"/></Route>
        <Route exact path="/general"><News key="4" apiKey={this.apiKey} pageSize={9} country="in" category="general"/></Route>
        <Route exact path="/health"><News key="5" apiKey={this.apiKey} pageSize={9} country="in" category="health"/></Route>
        <Route exact path="/science"><News key="6" apiKey={this.apiKey} pageSize={9} country="in" category="science"/></Route>
        <Route exact path="/sports"><News key="7" apiKey={this.apiKey} pageSize={9} country="in" category="sports"/></Route>
        <Route exact path="/technology"><News key="8" apiKey={this.apiKey} pageSize={9} country="in" category="technology"/></Route>        
        </Switch>
        </Router>
      </div>
    )
  }
}
