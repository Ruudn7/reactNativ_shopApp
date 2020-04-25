import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware } from 'redux';

import ReduxThunk from 'redux-thunk';

import NavigationContainer from './navigation/NavigationContainer';
import cartReducer from './store/reducers/cart';
import productsReducer from './store/reducers/product';
import orderReducer from './store/reducers/order';

import authReducer from './store/reducers/auth';
const rootReducer = combineReducers({
  cart: cartReducer,
  products: productsReducer,
  orders: orderReducer,
  auth: authReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          setFontLoaded(true);
        }}
      />
    );
  }
  return (

    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
}
