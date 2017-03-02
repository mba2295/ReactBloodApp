var React = require('react');
var ReactDOM = require('react-dom');
var Login = require('Login');
var UserMain = require('UserMain');
var Requests = require('Requests');
var SignUp = require('SignUp');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');
var {Provider}=require('react-redux');
var store = require('./store/configureStore').storeConfig();
var {myFirebase, refFirebase}=require('app/firebase/');
var actions = require('./actions/index');
import injectTapEventPlugin from 'react-tap-event-plugin';

var currentState = store.getState();
store.subscribe(function () {
    console.log('Current store state:', currentState);
});


var loginRequired = function (nextState, replace, next) {
    if (!myFirebase.auth().currentUser) {
        replace('/');
    }
    next();
};
var ifLogedIn = function (nextState, replace, next) {
    if (myFirebase.auth().currentUser) {
        replace('/home');
    }
    next();
};
myFirebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        store.dispatch(actions.setUidOnLogin(user.uid));
        store.dispatch(actions.startFetching());
        hashHistory.push('/home');
    }
    else {
        store.dispatch(actions.logout());
        hashHistory.push('/');
    }
});

injectTapEventPlugin();

//window.onunload = myFirebase.auth().signOut();
ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path='/'>
                <Route path='home' component={UserMain} onEnter={loginRequired}></Route>
                <Route path='requests' component={Requests} onEnter={loginRequired}></Route>
                <IndexRoute component={Login} onEnter={ifLogedIn}></IndexRoute>
            </Route>
        </Router>
    </Provider>
    , document.getElementById('app')
);
