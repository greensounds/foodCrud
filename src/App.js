import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Products from './components/Products';
import Product from './components/Product';
import EditProduct from './components/EditProduct';
import AddProduct from './components/AddProduct';
import Header from './components/Header'

function App() {

  const [products, setProducts] = useState([]);
  const [reloadProducts, setReloadProducts] = useState(true)

  useEffect(() => {
    if(reloadProducts === true) {
      const fetchAPI = async () => {
        //consume api
        const outcome = await axios.get('http://localhost:4000/restaurant')
        setProducts(outcome.data);
      } 
      fetchAPI()
      //Set reaload to false
      setReloadProducts(false)

    }
  }, [reloadProducts])

  return (
    <Router>
      <Header />
      <main className="container mt-5 mb-5">
        <Switch>
          <Route exact path="/new-product" render={() => (
            <AddProduct setReloadProducts={setReloadProducts} />
          )} />
          <Route exact path="/products" render={() => (
            <Products products={products} setReloadProducts={setReloadProducts}/>
          )}/>
          <Route exact path="/products/:id" component={Products} />
          <Route exact path="/products/edit/:id" render={(props) => {
            const idProduct = parseInt(props.match.params.id);

            //filter
            const product = products.filter(product => product.id === idProduct);
            return(
              <EditProduct product={product[0]} setReloadProducts={setReloadProducts} />
            )
          }} />
        </Switch>
      </main>
      <p className="mt-4 p2 text-center">Food Crud App</p>
    </Router>
  );
}

export default App;
