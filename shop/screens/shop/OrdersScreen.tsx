import React from 'react';
import { View, Text, FlatList, StyleSheet, Platform } from 'react-native';
import { useSelector } from 'react-redux';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/UI/HeaderButton';

const OrderScreen = props => {
    const orders = useSelector(state => {
        return state.orders.orders
    })

    return <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={itemData => <Text>{itemData.item.totalAmount.toFixed(2)}</Text>}
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