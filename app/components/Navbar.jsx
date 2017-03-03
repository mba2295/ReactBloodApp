import {AppBar, Tabs, Tab, FlatButton} from 'material-ui'
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
var {connect} = require('react-redux');
var React = require('react')
var {hashHistory}=require('react-router');
var {connect} = require('react-redux');
var actions = require('./../actions/index');
var {bindActionCreators}=require('redux');

var Navbar = React.createClass(
    {
        getInitialState: function () {
            return {initialTab: 0,};
        },
        getChildContext: function () {
            return {muiTheme: getMuiTheme(baseTheme)};
        },
        componentDidMount: function () {
            this.checkLocation();
        },
        checkTouch: function (value) {
            if (value == 0) {
                hashHistory.push('/home')
                this.setState({initialTab: 0})
            } else {
                hashHistory.push('/requests')
                this.setState({initialTab: 1})
            }
        },
        checkLocation: function () {
            if (window.location.href.indexOf('home') > -1) {
                this.setState({initialTab: 0})
            } else {
                this.setState({initialTab: 1})
            }
        },
        render: function () {
            var styles = {
                appBar: {
                    flexWrap: 'wrap'
                },
                tabs: {
                    width: '70%'
                },
                buttonStyle: {
                    backgroundColor: 'transparent',
                    color: 'white'
                },
            };
            return (
                <AppBar showMenuIconButton={false} style={styles.appBar} title="Blood Application">
                    <Tabs value={this.state.initialTab} style={styles.tabs} onChange={this.checkTouch}>
                        <Tab value={0} label="Requests"/>
                        <Tab value={1} label="Donors"/>
                    </Tabs>
                    <div>
                        <FlatButton onClick={this.props.logout} style={styles.buttonStyle} label="Logout"/>
                    </div>
                </AppBar>
            );
        }
    });

Navbar.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};


function mapStateToProps(state) {
    return {
        loginorSignin: state.loginsignupReducer,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        logout: actions.logoutStart,
    }, dispatch);
}


module.exports = connect(mapStateToProps, matchDispatchToProps)(Navbar);