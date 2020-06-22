import React, {useState} from 'react';
import {connect} from 'react-redux';

const Categories = (props) => {
    const [newCategoryName, setNewCategoryName] = useState('');
    return (
        <div>
            <form onSubmit={(event) => {event.preventDefault();}}>
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