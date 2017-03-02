var React = require('react');
var {connect} = require('react-redux');
var {bindActionCreators}=require('redux');
var actions = require('./../actions/index');
import {TableRow, TableRowColumn} from 'material-ui';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


var RequestLists = React.createClass({

    getChildContext: function () {
        return {muiTheme: getMuiTheme(baseTheme)};
    },


    render: function () {
        console.log(this.props.userRequest);
        return (
        <TableRow>
            <TableRowColumn>{this.props.userRequest.name}</TableRowColumn>
            <TableRowColumn>{this.props.userRequest.bloodType}</TableRowColumn>
            <TableRowColumn>{this.props.userRequest.phone}</TableRowColumn>
        </TableRow>
        )
        ;
    }
});

RequestLists.childContextTypes = {
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

module.exports = connect(mapStateToProps, matchDispatchToProps)(RequestLists);