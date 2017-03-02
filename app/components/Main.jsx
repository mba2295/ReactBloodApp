var React = require('react');
var {connect} = require('react-redux');
var {bindActionCreators}=require('redux');
var {Link}=require('react-router');

var actions = require('./../actions/index');
var Main = React.createClass({

    render: function () {
        return (
            <div>
                {this.props.children}
            </div>
        );
    }
});

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

module.exports = connect(mapStateToProps, matchDispatchToProps)(Main);