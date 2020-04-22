import React from 'react';
import { FlatList, Platform, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';

import OrderItem from '../../components/shop/OrderItem';
import CustomHeaderButton from '../../components/UI/HeaderButton';


const OrderScreen = props => {
    const orders = useSelector(state => {
        return state.orders.orders
    })

    return <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={itemData => <OrderItem
            amount={itemData.item.totalAmount}
            date={itemData.item.readableDate}
            items={itemData.item.items}
        />}
    />
};

OrderScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Orders',
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Cart'
                    iconName={ Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={()=>{
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        ),
        headerRight: (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Cart'
                    iconName={ Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
                    onPress={()=>{
                        navData.navigation.navigate('Cart')
                    }}
                />
            </HeaderButtons>
        )

    }
}

const styles = StyleSheet.create({

});

export default OrderScreen;