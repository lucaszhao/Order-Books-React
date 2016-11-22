import React from 'react';
import SetIntervalMixin from './mixins/set_interval_mixin';
import CartTimeoutMixin from './mixins/cart_timeout_mixin';

var ShippingDetails = React.createClass({

    propTypes : {
        alertCartTimeout : React.PropTypes.func.isRequired,
        updateCartTimeout : React.PropTypes.func.isRequired,
        cartTimeout: React.PropTypes.number.isRequired,
    },

    mixins: [SetIntervalMixin, CartTimeoutMixin],

    getInitialState() {
        return (
            {
                fullName : '',
                contactNumber : '',
                shippingAddress : '',
                error : false,
                cartTimeout : this.props.cartTimeout,
            }
        );
    },

    _renderError() {
        if (this.state.error) {
            return (
                <div className="alert alert-danger">
                    {this.state.error}
                </div>
            );
        }
    },

    _validateInput() {
        if (this.state.fullName === '') {
            this.setState({error : 'Please enter full name'});
        } else if (this.state.contactNumber === '') {
            this.setState({error : 'Please enter your contact number'});
        } else if (this.state.shippingAddress === '') {
            this.setState({error : 'Please enter your shipping address.'});
        } else {
            this.setState({error : false});
            return true;
        }
    },

    handleSubmit (event) {
        event.preventDefault();

        var formData = {
            fullName : this.state.fullName,
            contactNumber: this.state.contactNumber,
            shippingAddress: this.state.shippingAddress,
        };
        if (this._validateInput()) {
            this.props.updateFormData(formData);
        }
    },

    handelChange(event, attribute) {
        var newState = this.state;
        newState[attribute] = event.target.value;
        this.setState(newState);
    },

    render() {
        var errorMessage = this._renderError();
        var minutes = Math.floor(this.state.cartTimeout / 60);
        var seconds = this.state.cartTimeout - minutes * 60;

        return (
            <div>
                <h1>
                    Entering your shipping information.
                </h1>
                {errorMessage}
                <div style={{width:200}}>
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input className="form-control"
                                   type="text"
                                   placeholder="Full Name"
                                   value={this.state.fullName}
                                   onChange={(event) => this.handelChange(event, 'fullName')} />
                        </div>

                        <div className="form-group">
                            <input className="form-control"
                                   type="text"
                                   placeholder="Contact Number"
                                   value={this.state.contactNumber}
                                   onChange={(event) => this.handelChange(event, 'contactNumber')} />
                        </div>

                        <div className="form-group">
                            <input className="form-control"
                                   type="text"
                                   placeholder="Shipping Address"
                                   value={this.state.shippingAddress}
                                   onChange={(event) => this.handelChange(event, 'shippingAddress')} />
                        </div>

                        <div className="form-group">
                            <button type="submit" ref="submit" className="btn btn-success">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>

                <br />

                <div className="well">
                    <span className="glyphicon glyphicon-time" aria-hidden="true"></span> You have {minutes} Minutes,
                    {seconds} Seconds, before confirming order.
                </div>

            </div>
        );
    },
});

export default ShippingDetails;