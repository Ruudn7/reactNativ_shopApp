import React from 'react';
import { FlatList, StyleSheet, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';

import ProductItem from '../../components/shop/productItem';
import CustomHeaderButton from '../../components/UI/HeaderButton';

const UserProductScreen = props => {
    const userProducts = useSelector(state =>  state.products.userProducts);
    return (
        <FlatList
            data={userProducts}
            keyExtractor={item => item.id}
            renderItem={itemData => <ProductItem
                image={itemData.item.imageUrl}
                title={itemData.item.title}
                price={itemData.item.price}
                onViewDetail={() => {}}
                onAddToCart={() => {}}
            />}
        />
    )
};


UserProductScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your products',
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                    title='Menu'
                    iconName={ Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
                    onPress={()=>{
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        )
    }
}

const styles = StyleSheet.create({

});

export default UserProductScreen;