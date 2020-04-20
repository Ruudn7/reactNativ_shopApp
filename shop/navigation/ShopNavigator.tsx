import { Platform } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import Colors from '../constans/Colors';
import ProductOverviewScreen from '../screens/shop/ProductOverviewScreen';


const ProductNavigator = createStackNavigator({
    ProductOverviewScree: ProductOverviewScreen
}, {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
        },
        headerTintColor: Platform.OS === 'android' ? '' : Colors.primary
    }
})

export default createAppContainer(ProductNavigator);