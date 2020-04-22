import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Platform } from 'react-native';
import { createAppContainer, createDrawerNavigator, createStackNavigator } from 'react-navigation';

import Colors from '../constans/Colors';
import CartScreen from '../screens/shop/CartScreen';
import OrderScreen from '../screens/shop/OrdersScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import UserProductScreen from '../screens/user/UserProductScreen';

const defaultNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold',
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans',
    },
    headerTintColor: Platform.OS === 'android' ? '' : Colors.primary
}

const ProductNavigator = createStackNavigator(
    {
        ProductOverview: ProductOverviewScreen,
        ProductDetails: ProductDetailScreen,
        Cart: CartScreen,
        Orders: OrderScreen
    }, {
        navigationOptions: {
            drawerIcon: drawerConfig => <Ionicons
                name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                size={23}
                color={drawerConfig.tintColor}    
            />
        },
        defaultNavigationOptions: defaultNavOptions
    }
)

const OrdersNavigator = createStackNavigator(
    {
        Orders: OrderScreen
    },
    {
        navigationOptions: {
            drawerIcon: drawerConfig => <Ionicons
                name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
                size={23}
                color={drawerConfig.tintColor}    
            />
        },
        defaultNavigationOptions: defaultNavOptions,
    }
)

const AdminNavigator = createStackNavigator(
    {
        UsersProducts: UserProductScreen,
        EditProduct: EditProductScreen
    },
    {
        navigationOptions: {
            drawerIcon: drawerConfig => <Ionicons
                name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                size={23}
                color={drawerConfig.tintColor}    
            />
        },
        defaultNavigationOptions: defaultNavOptions,
    }
)

const shopNavigator = createDrawerNavigator({
    Products: ProductNavigator,
    Order: OrdersNavigator,
    Admin: AdminNavigator
}, {
    contentOptions: {
        activeTintColor: Colors.primary
    },
    overlayColor: 'rgba(0,0,0,0.6)'
})

export default createAppContainer(shopNavigator);