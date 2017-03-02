var React = require('react');
var {connect} = require('react-redux');
var {bindActionCreators}=require('redux');
import {CircularProgress, Table, TableHeader, TableBody, TableRow, TableHeaderColumn} from 'material-ui';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
var actions = require('./../actions/index');
var Navbar = require('Navbar');
var RequestLists = require('RequestLists');
var Requests = React.createClass({
        getChildContext: function () {
            return {muiTheme: getMuiTheme(baseTheme)};
        },
        componentDidMount: function () {
            this.props.getRequests();
        },
        render: function () {
            if (this.props.usersObject.fetching) {
                return (<CircularProgress />);
            }
            else {
                if (this.props.usersObject.userRequests) {
                    var requests = this.props.usersObject.userRequests;
                    return (
                        <div>
                            <Navbar></Navbar>
                            <h3>Requests</h3>
                            <Table>
                                <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                                    <TableRow>
                                        <TableHeaderColumn>Name</TableHeaderColumn>
                                        <TableHeaderColumn>Blood Type</TableHeaderColumn>
                                        <TableHeaderColumn>Phone Number</TableHeaderColumn>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {
                                        Object.keys(requests).map(function (key) {
                                            console.log(requests[key]);
                                            return (
                                                <RequestLists userKey={key} key={key}
                                                              userRequest={requests[key]}></RequestLists>
                                            );
                                        }.bind(this))
                                    }
                                </TableBody>
                            </Table>
                        </div>
                    );
                }
                else {
                    return (
                        <div>
                            <Navbar></Navbar>
                            <h3>Requests</h3>
                            <p>No requests</p>
                        </div>
                    );
                }
            }
        }
    }
);

Requests.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};


function mapStateToProps(state) {

    return {
        usersObject: state.usersFetchingReducer,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getRequests: actions.getRequests,
        logout: actions.logoutStart,

    }, dispatch);
}

module.exports = connect(mapStateToProps, matchDispatchToProps)(Requests);