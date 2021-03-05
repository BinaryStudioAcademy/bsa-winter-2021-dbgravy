import React from 'react';
import { render } from 'react-dom';
import App from './scenes/App/App';
import {BrowserRouter as Router, Route} from "react-router-dom";

render(
    <Router>
        <Route path="/"><App /></Route>
    </Router>,
    document.getElementById('root')
);
