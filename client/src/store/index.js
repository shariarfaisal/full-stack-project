import {createStore,compose,applyMiddleware} from 'redux';
import reducer from './reducers/rootReducer';
import thunk from 'redux-thunk';
const middleware = [thunk]
const store = createStore(reducer,compose(
  applyMiddleware(...middleware),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

export default store;
