import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import queryString from 'querystring';

import {searchProducts, searchGuestProducts} from '../../config/actions/productsListActions';
import {sortProductsByPrice} from '../../config/generalFunctions/filters';

const SearchedProducts = (props) => {
    const [searchTerm, setSearchTerm] = useState(queryString.parse(props.location.search.slice(1)).searchTerm);
    const [isNew, setisNew] = useState(true);
    const [sortOptions, setSortOptions] = useState(false);
    const [sortBy, setSortBy] = useState(1);
    useEffect( () => {
        if( isNew && !props.productsLst && props.token && props.match.url.includes('account')) {
            props.dispatch(searchProducts(searchTerm, sortBy));
            setisNew(false);
        }
        if( isNew && !props.productsLst && !props.match.url.includes('account')) {
            props.dispatch(searchGuestProducts(searchTerm, sortBy));
            setisNew(false);
        }
        if(queryString.parse(props.location.search.slice(1)).searchTerm !== searchTerm) {
            setSearchTerm(queryString.parse(props.location.search.slice(1)).searchTerm);
            if(props.match.url.includes('account')) {
                props.dispatch(searchProducts(queryString.parse(props.location.search.slice(1)).searchTerm, sortBy));
            }
            else  {
                props.dispatch(searchGuestProducts(queryString.parse(props.location.search.slice(1)).searchTerm, sortBy));
            }
        }
    }, [props, searchTerm, setSearchTerm, isNew, setisNew, sortBy]);
    return (props.productsList)?(props.productsList.length > 0)?(
        <div>
            <form>
                {
                    (sortOptions)? (
                        <div>
                            <button onClick={() => {setSortOptions(false)}}>Sort By</button>
                            <br/>
                            <label>
                                <input type="radio" checked={sortBy === 1} onChange={() => {setSortBy(1);sortProductsByPrice(props.productsList, 1)}}/>
                                Ascending Price
                            </label><br/>
                            <label>
                                <input type="radio" checked={sortBy === 2} onChange={() => {setSortBy(2);sortProductsByPrice(props.productsList, 2)}}/>
                                Descending Price
                            </label>
                        </div>
                    ):<button onClick={() => {setSortOptions(true)}}>
                        Sort By :
                        {(sortBy === 1)?"Ascending Price":(sortBy === 2)?"Descending Options":null}
                        </button>
                }
            </form>
            {
                props.productsList.map( (product, index) => {
                    return (
                        <div key={index} onClick={() => {props.history.push(`${props.match.url.includes('account')?"/account":""}/product/${product._id}`);}}>
                            <h4>{product.name}</h4>
                            <div>
                                Price: ${product.price}
                            </div>
                            <div>
                                {
                                    (product.isAvailable)?"Available":"Unaivailable"
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>):(
            <div>Could not find any matching Products</div>
        ):<div>Products List is empty</div>
}

const mapStateToProps = (state) => {
    const {productsList, token} = state;
    return {productsList, token};
}

export default connect(mapStateToProps)(SearchedProducts);