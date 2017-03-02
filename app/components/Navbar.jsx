import {AppBar, Tabs, Tab, FlatButton} from 'material-ui'
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
var {connect} = require('react-redux');
var React=require('react')
var {hashHistory}=require('react-router');
var {connect} = require('react-redux');
var actions=require('./../actions/index');
var {bindActionCreators}=require('redux');

var Navbar = React.createClass(
    {
        getChildContext: function () {
            return {muiTheme: getMuiTheme(baseTheme)};
        },
        checkTouch: function (value) {
            if (value == 0) {
                hashHistory.push('/home')
            } else {
                hashHistory.push('/requests')
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
                    <Tabs style={styles.tabs} onChange={this.checkTouch}>
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