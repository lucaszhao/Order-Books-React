import React from 'react';

var Confirmation = React.createClass({

    handleSubmit(event) {
        event.preventDefault();
        this.props.updateFormData(this.props.data);
    },

    render() {
        return (
            <div>
                <h1>Are you sure you want to submit the data?</h1>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <strong>Full Name</strong> : {this.props.data.fullName}
                    </div>
                    <br />

                    <div>
                        <strong>contact Number</strong> : {this.props.data.contactNumber}
                    </div>
                    <br />

                    <div>
                        <strong>Shipping Address</strong> : {this.props.data.shippingAddress}
                    </div>
                    <br />

                    <div>
                        <strong>Selected Books</strong> : {this.props.data.selectedBooks.join(', ')}
                    </div>
                    <br />

                    <button className="btn btn-success">
                        Place Order
                    </button>
                </form>
            </div>
        );
    }
});

export default Confirmation;
