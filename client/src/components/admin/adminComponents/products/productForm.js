import React from 'react';
import {connect} from 'react-redux'

import {loadCategories} from '../../../../config/actions/categoriesActions';
import {addProduct, updateProduct} from '../../../../config/actions/productActions';

class ProductForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            price: 0,
            categoryId: [],
            isAvailable: false,
            stock: 0
        }
    }

    componentDidMount() {
        this.props.dispatch(loadCategories());
        if(this.props.product && this.props.type === "modify") {
            this.setState(this.props.product);
        }
        if(!this.props.product && this.props.type === "modify") {
            this.props.history.push('/admin/product');
        }
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = event => {
        event.preventDefault();
        if(this.props.type === "add") {
            this.props.dispatch(addProduct({...this.state}, this.props.redirect));
        }
        if(this.props.type === "modify") {
            this.props.dispatch(updateProduct({...this.state}, this.props.history.push));
        }
    }

    handleSelection = event => {
        const temp = event.target.value;
        this.setState( prevState => {
            if(prevState.categoryId.includes(temp)) {
                return {
                    categoryId: prevState.categoryId.filter( category => category !== temp)
                }
            }
            if(temp === "None") {
                return {
                    categoryId: []
                }
            }
            return {
                categoryId: [...prevState.categoryId, temp]
            }
        });
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
                    Categories:<br/>
                    {
                        (this.props.categories)? (
                            <select multiple={true} value={this.state.categoryId} onChange={this.handleSelection}>
                                <option value="None">None</option>
                                {this.props.categories.map( (category, index) => <option key={index} value={category._id}>{category.name}</option>)}
                            </select>
                        ):null
                    }
                </label><br/>

                <label>
                    <input type="checkbox" checked={this.state.isAvailable} onChange={() => {this.setState(prevState => ({isAvailable: !prevState.isAvailable}))}}/> Available
                </label><br/>

                <label>
                    Stock:
                    <input type="number" name="stock" value={this.state.stock} onChange={this.handleChange}/>
                </label><br/>

                <input type="submit" value={(this.props.type === "add")?"Create Product":"Update Product"}/>
            </form>
        )
    }
}

const mapStateToProps = (state) => {
    const {categories, product} = state;
    return {categories, product};
}

export default connect(mapStateToProps)(ProductForm);