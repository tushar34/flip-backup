import logo from './logo.svg';
import './App.css';
import Home from './component/Home';
import Productdetail from './component/Productdetail';
// import {} from "react-router-dom"
import Addtocart from './component/Addtocart';
import Header from './component/Header';
import Checkout from './component/Checkout';
import history from './history';
import Productlist from './component/Productlist';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Profile from './component/Profile';
import Userprofile from './component/Userprofile';
import Myorder from './component/Myorder'
function App() {
  return (
    <>
      <Router history={history}>
        <Header history={history} />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/productdetail' component={Productdetail} />
          <Route path='/addtocart' component={Addtocart} />
          <Route path='/checkout' component={Checkout} />
          <Route path='/productlist' component={Productlist} />
          <Route path='/profile' component={Profile} />
          
          {/* <Route exact path='/profile/myorder' component={Myorder} /> */}
        </Switch>
      </Router>
    </>
  );
}

export default App;
