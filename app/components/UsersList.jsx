var React = require('react');
var {connect} = require('react-redux');
var {bindActionCreators}=require('redux');
var actions = require('./../actions/index');
import {FlatButton, TableRow, TableRowColumn} from 'material-ui';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Divider from 'material-ui/Divider';

var UsersList = React.createClass({

    getChildContext: function () {
        return {muiTheme: getMuiTheme(baseTheme)};
    },

    requestUser: function (key) {
        console.log(key);
        this.props.request(key);
    },
    render: function () {
        var styles = {
            buttonStyle: {
                backgroundColor: 'rgb(0, 188, 212)',
            },
        };
        return (

            <TableRow>
                <TableRowColumn>{this.props.user.name}</TableRowColumn>
                <TableRowColumn>{this.props.user.bloodType}</TableRowColumn>
                <TableRowColumn>{this.props.user.phone}</TableRowColumn>
                <TableRowColumn><FlatButton style={styles.buttonStyle}
                    onClick={this.requestUser.bind(this, this.props.userKey)}>Request</FlatButton></TableRowColumn>
            </TableRow>
        );
    }
});

UsersList.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};


function mapStateToProps(state) {

    return {
        usersObject: state.usersFetchingReducer,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getUsers: actions.getAllUsers,
        request: actions.requestUser,
    }, dispatch);
}

module.exports = connect(mapStateToProps, matchDispatchToProps)(UsersList);