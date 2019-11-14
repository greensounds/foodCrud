import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';

function ListProduct({ product,setReloadProducts }) {
    const deleteProduct = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then(async (result) => {
            if (result.value) {
              
              const url = `http://localhost:4000/restaurant/${id}`;
              const outcome = await axios.delete(url);

              if(outcome.status === 200) {
                Swal.fire(
                    'Deleted!',
                    'Your product has been deleted.',
                    'success'
                  )
                 //Reload
                setReloadProducts(true)
              }

            }
          })

    }

    return(
        <li data-category={product.category} className="list-group-item d-flex justify-content-between align-items-center">
            <p>
                {product.dishName}
                <span className="font-weight-bold">$ {product.dishPrice}</span>
            </p>
            <div>
                <Link className="btn btn-success mr-2" to={`/products/edit/${product.id}`}>Edit</Link>
                <button type="button" className="btn btn-danger" onClick={() => deleteProduct(product.id)}>Delete &times;</button>
            </div>
        </li>
    )
}

export default ListProduct