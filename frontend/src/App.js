import Header from './Components/Header';
import Basket from './Components/Basket';
import Main from './Components/Main';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import data from './data';
import { useState, useEffect } from 'react';
import Login from './Components/Login';
import Signup from './Components/Signup';
import ForgotPassword from './Components/ForgotPassword';
import PrivateRoute from './Components/PrivateRoute';
import Profile from './Components/Profile';
import UpdateProfile from './Components/UpdateProfile';

function App() {
  const [Data, setData] = useState([]);
  const fetchData = () => {
    return fetch('http://localhost:8000/api/products/')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => setData(data));
  };

  useEffect(() => {
    fetchData();
  }, []);
  const products = Data;
  const [cartItems, setCartItems] = useState([]);
  const onAdd = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist) {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };

  const onRemove = (product) => {
    const exist = cartItems.find((x) => x.id === product.id);
    if (exist.qty === 1) {
      setCartItems(cartItems.filter((x) => x.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((x) =>
          x.id === product.id ? { ...exist, qty: exist.qty - 1 } : x
        )
      );
    }
  };

  return (
    <div className="App">
      <Header countCartItems={cartItems.length}></Header>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <div className="row">
              <Main onAdd={onAdd} products={products}></Main>
              <Basket
                onAdd={onAdd}
                onRemove={onRemove}
                cartItems={cartItems}
                className="scroll"
              ></Basket>
            </div>
          </Route>
          <PrivateRoute exact path="/profile" component={Profile} />
          <PrivateRoute
            exact
            path="/update-profile"
            component={UpdateProfile}
          />
          <Route path="/signin">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/forgot-password">
            <ForgotPassword />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
