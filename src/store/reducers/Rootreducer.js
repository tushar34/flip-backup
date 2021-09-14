import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import Loginreducer from './Login';
import Getallproductreducer from './Product';
import Getspecificproductreducer from './Getspecificproduct';
import Addtocartreducer from './Addtocart';
import Usercartlistreducer from './Usercartlist';
import Cityreducer from './Cityview';
import Addressreducer from './Address'
import Productofsuccategoryreducer from './Productofsuccategory';
import Userreducer from './User'
const persistConfig = {
  key: 'auth',
  storage: storage,
  whitelist: ['UserReducer','ProductofsuccategoryReducer','AddressReducer','LoginReducer','GetallproductReducer','GetspecificproductReducer','AddtocartReducer','UsercartlistReducer','CityReducer']
};

const rootReducer = combineReducers({
  LoginReducer: Loginreducer,
  GetallproductReducer: Getallproductreducer,
  GetspecificproductReducer:Getspecificproductreducer,
  AddtocartReducer:Addtocartreducer,
  UsercartlistReducer:Usercartlistreducer,
  CityReducer:Cityreducer,
  AddressReducer:Addressreducer,
  ProductofsuccategoryReducer:Productofsuccategoryreducer,
  UserReducer:Userreducer
});
export default persistReducer(persistConfig, rootReducer);

