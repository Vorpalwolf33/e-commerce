import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

import {addCategory, loadCategories, removeCategory} from '../../../config/actions/categoriesActions';

const Categories = (props) => {
    const [newCategoryName, setNewCategoryName] = useState('');
    useEffect(() => {
        props.dispatch(loadCategories());
    }, [props]);
    return (
        <div>
            <form onSubmit={(event) => {event.preventDefault();props.dispatch(addCategory(newCategoryName)); setNewCategoryName('')}}>
                <input type="text" value={newCategoryName} onChange={(event) => {setNewCategoryName(event.target.value)}} placeholder="Category Name"/>
                <input type="submit" value="Add" />
            </form>
            <h4>Listing Categories:</h4>
            {
                (props.categories)? (
                    <div>
                        {
                            props.categories.map( (category, index) => (
                                <div key={index}>
                                    {category.name}
                                    <button>Rename</button>
                                    <button onClick={() => {props.dispatch(removeCategory(category))}}>Remove</button>
                                </div>
                            ))
                        }
                    </div>
                ):null
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    const {categories} = state
    return {categories};
}

export default connect(mapStateToProps)(Categories);