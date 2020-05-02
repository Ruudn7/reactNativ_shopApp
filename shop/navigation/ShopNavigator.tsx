import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Button, Platform, SafeAreaView, View } from 'react-native';
import { useDispatch } from 'react-redux';

import Colors from '../constans/Colors';
import CartScreen, { screenOptions as optionCart } from '../screens/shop/CartScreen';
import OrderScreen, { screenOptions as orderOptions } from '../screens/shop/OrdersScreen';
import ProductDetailScreen, { screenOptions as optionsDetails } from '../screens/shop/ProductDetailScreen';
import ProductOverviewScreen, { screenOptions as optionsOverview } from '../screens/shop/ProductOverviewScreen';
import AuthScreen, { optionsScreen as optionsAuth } from '../screens/user/AuthScreen';
import EditProductScreen, { optionScreen as optionsEditProd } from '../screens/user/EditProductScreen';
import UserProductScreen, { optionsSceen as oprionsUserProd } from '../screens/user/UserProductScreen';
import * as authActions from '../store/actions/auth';


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
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
}

const ProductStackNavigator = createStackNavigator();

export const ProductNavigator = () => {
    return (
        <ProductStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <ProductStackNavigator.Screen
                name="ProductOverview"
                component={ProductOverviewScreen}
                options={optionsOverview}
            />
            <ProductStackNavigator.Screen
                name="ProductDetails"
                component={ProductDetailScreen}
                options={optionsDetails}
            
            />
            <ProductStackNavigator.Screen
                name="Cart"
                component={CartScreen}
                options={optionCart}
            />
        </ProductStackNavigator.Navigator>
    )
}
const OrderStackNavigator = createStackNavigator();

export const OrdersNavigator = () => {
    return (
        <OrderStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <OrderStackNavigator.Screen
                name="Orders"
                component={OrderScreen}
                options={orderOptions}
            />
        </OrderStackNavigator.Navigator>
    )
}

const AdminStackNavigator = createStackNavigator();

export const AdminNavigator = () => {
    return (
        <AdminStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <AdminStackNavigator.Screen
                name="UsersProducts"
                component={UserProductScreen}
                options={oprionsUserProd}
            />
            <AdminStackNavigator.Screen
                name="EditProduct"
                component={EditProductScreen}
                options={optionsEditProd}
            />
        </AdminStackNavigator.Navigator>
    )
}

const ShopDrawerNavigator = createDrawerNavigator();
export const ShopNavigator = () => {
    const dispatch = useDispatch();
    return (
        <ShopDrawerNavigator.Navigator
            drawerContent={ props => {
                return (
                    <View style={{flex: 1, padding: 20}}>
                        <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
                            <DrawerItemList {...props} />
                            <Button
                                title="Logout"
                                color={Colors.primary}
                                onPress={()=>{
                                    dispatch(authActions.logout());
                                }}
                            />
                        </SafeAreaView>
                    </View>
                )}
            }
        >
            <ShopDrawerNavigator.Screen
                name='Products'
                component={ProductNavigator}
                options={{
                    drawerIcon: props => <Ionicons
                        name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                        size={23}
                        color={props.color}    
                    />
                }}
            />
          <ShopDrawerNavigator.Screen
                name='Orders'
                component={OrdersNavigator}
                options={{
                    drawerIcon: props => <Ionicons
                        name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
                        size={23}
                        color={props.color}    
                    />
                }}
            />
            <ShopDrawerNavigator.Screen
                name='Admin'
                component={AdminNavigator}
                options={{
                    drawerIcon: props => <Ionicons
                        name={Platform.OS === 'android' ? 'md-create' : 'ios-create'}
                        size={23}
                        color={props.color}
                    />
                }}
            />
        </ShopDrawerNavigator.Navigator>
    )
}

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
    return (
        <AuthStackNavigator.Navigator>
            <AuthStackNavigator.Screen
                name='Auth'
                component={AuthScreen}
                options={optionsAuth}
            />
        </AuthStackNavigator.Navigator>
    )
}
