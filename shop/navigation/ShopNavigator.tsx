import { Platform } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import Colors from '../constans/Colors';
import CartScreen from '../screens/shop/CartScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen';


const ProductNavigator = createStackNavigator(
    {
        ProductOverview: ProductOverviewScreen,
        ProductDetails: ProductDetailScreen,
        Cart: CartScreen
    }, {
        defaultNavigationOptions: {
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
    }
)

export default createAppContainer(ProductNavigator);