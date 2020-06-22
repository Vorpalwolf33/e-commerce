import React from 'react';
import {connect} from 'react-redux'

class ProductForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            price: 0,
            categories: [],
            availableCategories: [],
            isAvailable: false,
            stock: 0
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault();
        this.props.handleSubmit(this.state);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Product Name:
                    <input type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
                </label><br/>
                
                <label>
                    Description:<br/>
                    <textarea value={this.state.description} name="description" onChange={this.handleChange}></textarea>
                </label><br/>

                <label>
                    Price:
                    <input type="number" name="price" value={this.state.price} onChange={this.handleChange}/>$
                </label><br/>

                <label>
                    Categories:
                    <select multiple={true} value={this.state.categories} onChange={(event) => {this.setState({categories: event.target.value})}}>
                        {this.state.availableCategories.map( (category, index) => <option key={index} value={category.name}>{category.name}</option>)}
                    </select>
                </label><br/>

                <label>
                    <input type="checkbox" checked={this.state.isAvailable} onChange={() => {this.setState(prevState => ({isAvailable: !prevState.isAvailable}))}}/> Available
                </label><br/>

                <label>
                    Stock:
                    <input type="number" name="stock" value={this.state.stock} onChange={this.handleChange}/>
                </label><br/>

                <input type="submit" value="Create Product"/>
            </form>
        )
    }
}

const mapStateToProps = (state) => {
    return {};
}

export default connect(mapStateToProps)(ProductForm);