import Register from './screens/register';
import Login from './screens/login';
import Home from './screens/home';
import ProtectedRoute from "./ProtectedRoute";
import Payment from './screens/payment';
import Product from './screens/product';
import YourCart from './screens/yourcart';
import Category from './screens/category';

// import { useLocation } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


function App() {
  // const token = JSON.parse(localStorage.getItem('token'));

  const cur = window.location.pathname;
  console.log(cur+"--------------------------------");
  
  const routes = [
    {
      path: '/',
      component: Home
    },
    {
      path: '/product/:id',
      component: Product
    },
    {
      path: '/yourcart-details',
      component: YourCart
    },
    {
      path: '/category',
      component: Category
    },
    {
      path: '/payment',
      component: Payment
    }


  ]

  return (
    <Router>
      <div>
        <Switch>
          {/* <ProtectedRoute1 exact path="/" component={Home}/> */}
          <Route path="/login" render={props => <Login {...props} />} />
          <Route path="/register" component={Register} />

          {routes.map(route => <ProtectedRoute exact {...route} />)}
          {/* <Route exact path="/category" component={Category} /> */}

        </Switch>
      </div>
    </Router>
  );
}


export default App;






