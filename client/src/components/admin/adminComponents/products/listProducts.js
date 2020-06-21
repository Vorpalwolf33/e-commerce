import React from "react";
import { connect } from "react-redux";

const ListProducts = (props) => {
    return (
        <div>
            products to be listed
        </div>
    )
}

const mapStateToProps = (state) => {
    return {};
}

export default connect(mapStateToProps)(ListProducts);