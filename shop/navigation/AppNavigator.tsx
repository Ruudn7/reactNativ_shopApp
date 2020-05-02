import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { useSelector } from 'react-redux';

import { createStackNavigator } from '@react-navigation/stack'
import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import { ProductNavigator } from './ShopNavigator';

const MyStack = createStackNavigator();

const AppNavigator = props => {

    const isAuth = useSelector(state => !!state.auth.token);

    return (
        <NavigationContainer>
            <ProductNavigator />
        </NavigationContainer>
    );
};

export default AppNavigator;