import React from 'react';
import ReactDOM from 'react-dom';
import BookList from "./BookList";
import ShippingDetails from './ShippingDetails';
import DeliveryDetails from './DeliveryDetails';
import Confirmation from './Confirmation';
import Success from './Success';
import ModalAlertTimeout from './ModalAlertTimeout';


var BookStore = React.createClass({
    getInitialState() {
        return ({currentStep : 1, formValues : {}, cartTimeout: 60 * 15});
    },

    updateCartTimeout(timeout) {
        this.setState({cartTimeout:timeout});
    },

    updateFormData(formData) {
        var formValues = Object.assign({}, this.state.formValues, formData);
        var nextStep = this.state.currentStep + 1;
        this.setState({currentStep: nextStep, formValues: formValues});
        console.log(formData);
    },

    alertCartTimeout() {
        ReactDOM.render(<ModalAlertTimeout />, document.getElementById('modalAlertTimeout'));
        this.setState({currentStep : 1, formValues: {}, cartTimeout:1});
    },

    render() {
        switch (this.state.currentStep) {
            case 1:
                return <BookList updateFormData={this.updateFormData} />;
            case 2:
                return <ShippingDetails updateFormData={this.updateFormData}
                                        cartTimeout={this.state.cartTimeout}
                                        updateCartTimeout={this.updateCartTimeout}
                                        alertCartTimeout={this.alertCartTimeout} />;
            case 3:
                return <DeliveryDetails updateFormData={this.updateFormData}
                                        cartTimeout={this.state.cartTimeout}
                                        updateCartTimeout={this.updateCartTimeout}
                                        alertCartTimeout={this.alertCartTimeout} />;
            case 4:
                return <Confirmation data={this.state.formValues}
                                     updateFormData={this.updateFormData}
                                     cartTimeout={this.state.cartTimeout} />;
            case 5:
                return <Success data={this.state.formValues}
                                cartTimeout={this.state.cartTimeout} />;
            case 10:
            //    handle the case of Cart timeout
                return (
                    <div>
                        <h2>Your cart timed out, Please try again!!</h2>
                    </div>
                );
            default:
                return <BookList updateFormData={this.updateFormData} />;
        }
    }
});

export default BookStore;