import React, { useState, useRef } from 'react'
import Error from './Error'
import Product from './Product';
import axios from 'axios';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';

function EditProduct({product, history, setReloadProducts}) {
    //create ref
    const dishPriceRef = useRef('');
    const dishNameRef = useRef('');

    const [error, setError] = useState(false);
    const [category, setCategory] = useState('');
    const editProduct = async (e) => {
        e.preventDefault();

        //Validate data
        const newDishName = dishNameRef.current.value;
        const newDishprice = dishPriceRef.current.value;

        if(newDishName === '' || newDishprice === '') {
            setError(true);
            return;
        }

        setError(false);

        //See in category changed
        let categoryDish =  (category === '') ? product.category : category;
        //Get data
        const editDish = {
            dishName: newDishName,
            dishPrice: newDishprice,
            category: categoryDish
        }
        //send request
        const url = `http://localhost:4000/restaurant/${product.id}`;
        const outcome = await axios.put(url, editDish);
        if(outcome.status === 200) {
            Swal.fire(
                'Product Edited',
                'Product has been edited correctly',
                'success'
            )
        } else {
            Swal.fire({
                type: 'error',
                title: 'Ooops...',
                text: 'Something went worng!'
            })
        }
        setReloadProducts(true);
        history.push('/products');
    }

    const radioValue = (e) => {
        setCategory(e.target.value)
    }  
    return (
        <div className="col-md-8 mx-auto ">
            <h1 className="text-center">Edit Product</h1>
            {(error) ? <Error message="All fields are required" /> : null}
            <form
                className="mt-5"
                onSubmit={editProduct}
            >
                <div className="form-group">
                    <label>Dish Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="name" 
                        placeholder="Dish Name"
                        ref={dishNameRef}
                        defaultValue={product.dishName}
                    />
                </div>

                <div className="form-group">
                    <label>Dish Price</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        name="price"
                        placeholder="Dish Price"
                        ref={dishPriceRef}
                        defaultValue={product.dishPrice}
                    />
                </div>

                <legend className="text-center">Category:</legend>
                <div className="text-center">
                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="category"
                        value="dessert"
                        onChange={radioValue}
                        defaultChecked={(product.category === 'dessert')}
                    />
                    <label className="form-check-label">
                        Dessert
                    </label>
                </div>
                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="category"
                        value="beverage"
                        onChange={radioValue}
                        defaultChecked={(product.category === 'beverage')}
                    />
                    <label className="form-check-label">
                        Beverage
                    </label>
                </div>

                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="categoria"
                        value="main"
                        onChange={radioValue}
                        defaultChecked={(product.category === 'main')}
                    />
                    <label className="form-check-label">
                        Main
                    </label>
                </div>

                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="categoria"
                        value="salad"
                        onChange={radioValue}
                        defaultChecked={(product.category === 'salad')}
                    />
                    <label className="form-check-label">
                        Salad
                    </label>
                </div>
                </div>

                <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Edit Product" />
            </form>
        </div>
    )
}

export default withRouter(EditProduct);