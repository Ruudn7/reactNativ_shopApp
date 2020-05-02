import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Platform, SafeAreaView, Button, View } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer'

import { useDispatch } from 'react-redux';
import Colors from '../constans/Colors';
import CartScreen, { screenOptions as optionCart } from '../screens/shop/CartScreen';
import OrderScreen, { screenOptions as orderOptions} from '../screens/shop/OrdersScreen';
import ProductDetailScreen, { screenOptions as optionsDetails } from '../screens/shop/ProductDetailScreen';
import ProductOverviewScreen, { screenOptions as optionsOverview } from '../screens/shop/ProductOverviewScreen';
import EditProductScreen, {optionScreen as optionsEditProd} from '../screens/user/EditProductScreen';
import UserProductScreen , {optionsSceen as oprionsUserProd} from '../screens/user/UserProductScreen';
import AuthScreen, {optionsScreen as optionsAuth} from '../screens/user/AuthScreen';
import StartupScreen from '../screens/StartupScreen';
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
                options={optionsDetails}
            />
            <ProductStackNavigator.Screen
                name="ProductDetails"
                component={ProductDetailScreen}
                options={optionsOverview}
            
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

// const ProductNavigator = createStackNavigator(
//     {
//         ProductOverview: ProductOverviewScreen,
//         ProductDetails: ProductDetailScreen,
//         Cart: CartScreen,
//         Orders: OrderScreen
//     }, {
//         navigationOptions: {
//             drawerIcon: drawerConfig => <Ionicons
//                 name={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
//                 size={23}
//                 color={drawerConfig.tintColor}    
//             />
//         },
//         defaultNavigationOptions: defaultNavOptions
//     }
// )

// const OrdersNavigator = createStackNavigator(
//     {
//         Orders: OrderScreen
//     },
//     {
//         navigationOptions: {
//             drawerIcon: drawerConfig => <Ionicons
//                 name={Platform.OS === 'android' ? 'md-list' : 'ios-list'}
//                 size={23}
//                 color={drawerConfig.tintColor}    
//             />
//         },
//         defaultNavigationOptions: defaultNavOptions,
//     }
// )

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

// const AdminNavigator = createStackNavigator(
//     {
//         UsersProducts: UserProductScreen,
//         EditProduct: EditProductScreen
//     },
//     {

//         defaultNavigationOptions: defaultNavOptions,
//     }
// )

const ShopDrawerNavigator = createDrawerNavigator();
const ShopNavigator = () => {
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
                                    props.navigation.navigate('Auth');
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

// const shopNavigator = createDrawerNavigator({
//     Products: ProductNavigator,
//     Order: OrdersNavigator,
//     Admin: AdminNavigator
// }, {
//     contentOptions: {
//         activeTintColor: Colors.primary
//     },
//     overlayColor: 'rgba(0,0,0,0.6)',
//     contentComponent: props => {

//         const dispatch = useDispatch();
//         return (
//             <View style={{flex: 1, padding: 20}}>
//                 <SafeAreaView forceInset={{top: 'always', horizontal: 'never'}}>
//                     <DrawerItems {...props} />
//                     <Button
//                         title="Logout"
//                         color={Colors.primary}
//                         onPress={()=>{
//                             dispatch(authActions.logout());
//                             props.navigation.navigate('Auth');
//                         }}
//                     />
//                 </SafeAreaView>
//             </View>
//         )
//     }
// })

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

// const AuthNavigator = createStackNavigator({
//     Auth: AuthScreen
// }, {
//     defaultNavigationOptions: defaultNavOptions
// })

// const MainNavigator = createSwitchNavigator({
//     Startup: StartupScreen,
//     Auth: AuthNavigator,
//     Shop: shopNavigator
// })

// export default createAppContainer(MainNavigator);