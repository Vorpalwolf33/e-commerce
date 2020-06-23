import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';

import {addCategory, loadCategories, removeCategory, updateCategory} from '../../../config/actions/categoriesActions';

const Categories = (props) => {
    const [newCategoryName, setNewCategoryName] = useState('');
    const [updatedName, setUpdatedName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
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
                            props.categories.map( (category, index) => {
                                return (selectedCategory === category._id)? (
                                        <div key={index}>
                                            <form onSubmit={(event) => { event.preventDefault(); const temp = {...category}; temp.name = updatedName;props.dispatch(updateCategory(temp)); setSelectedCategory(""); }}>
                                                <input type="text" value={updatedName} onChange={(event) => setUpdatedName(event.target.value)} />
                                                <input type="submit" value="Update" />
                                            </form>
                                            <button onClick={() => {setSelectedCategory(''); setUpdatedName('')}}>Cancel</button>
                                        </div>
                                    ):(
                                        <div key={index}>
                                            {category.name}
                                            <button onClick={() => {setSelectedCategory(category._id); setUpdatedName(category.name)}}>Rename</button>
                                            <button onClick={() => {props.dispatch(removeCategory(category))}}>Remove</button>
                                        </div>
                                    )
                            }
                            )
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