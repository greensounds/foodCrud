import React, {useState} from 'react'
import Error from './Error'
import axios from 'axios';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';

function AddProduct({history, setReloadProducts}) {
    const [dishName, setDish] = useState('');
    const [dishPrice, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [error, setError] = useState(false);

    const radioValue = (e) => {
        setCategory(e.target.value)
    }   

    const addProduct = async (e) => {
        e.preventDefault();
        if(dishName === '' || dishPrice === "" || category === "") {
            setError(true)
            return
        }

        setError(false);

        //Create new Product
        const outcome = await axios.post('http://localhost:4000/restaurant', {
            dishName,
            dishPrice,
            category
        })

        if(outcome.status === 201) {
            Swal.fire(
                'Product add',
                'Product has been added correctly',
                'success'
            )
        } else {
            Swal.fire({
                type: 'error',
                title: 'Ooops...',
                text: 'Something went worng!'
            })
        }
        //
        setReloadProducts(true);
        history.push('/products');
    }

    return (
        <div className="col-md-8 mx-auto ">
            <h1 className="text-center">Add Product</h1>
            {(error) ? <Error message="All fields are required" /> : null}
            <form
                className="mt-5"
                onSubmit={addProduct}
            >
                <div className="form-group">
                    <label>Dish Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="name" 
                        placeholder="Dish Name"
                        onChange= { e => setDish(e.target.value) }
                    />
                </div>

                <div className="form-group">
                    <label>Dish Price</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        name="price"
                        placeholder="Dish Price"
                        onChange= { e => setPrice(e.target.value) }
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
                    />
                    <label className="form-check-label">
                        Salad
                    </label>
                </div>
                </div>

                <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Add Product" />
            </form>
        </div>
    )
}

export default withRouter(AddProduct);