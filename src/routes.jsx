import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/Header/Index';
import Filme from './pages/Filme/Index';
import Home from './pages/home/Index';


const Routes = () => {
    return ( 
        <BrowserRouter>
            <Header />
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/filme/:id" exact component={Filme} />
            </Switch>
        
        </BrowserRouter>
     );
}
 
export default Routes;