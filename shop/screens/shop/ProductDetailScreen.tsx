import React from 'react';
import {
    ScrollView,
    View,
    Text,
    Button,
    Image,
    StyleSheet
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import Colors from '../../constans/Colors';
import * as cartActions from '../../store/actions/cart';

const ProductDetailScreen = props => {
    const productId = props.route.params.productId;
    const selectedProduct = useSelector(state => {
        return state.products.availableProducts.find(prod => prod.id === productId)
    })
    const dispatch = useDispatch();
    if (!selectedProduct) {
        return null;
    }

    return (
        <ScrollView>
            <Image source={{uri: selectedProduct.imageUrl}} style={styles.image} />
            <View style={styles.actions}>
                <Button
                    color={Colors.primary}
                    title='Add to Cart'
                    onPress={() => {
                        dispatch(cartActions.addToCart(selectedProduct))
                    }}
                />
            </View>
            <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>

    )
};

export const screenOptions = navData => {
    return {
        headerTitle: navData.route.params && navData.route.params.productTitle ? navData.route.params.productTitle : ''
    };
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 300
    },
    actions: {
        marginVertical: 10,
        alignItems: 'center'
    },
    price: {
        fontSize: 20,
        color: '#888',
        textAlign: 'center',
        marginVertical: 20
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        marginHorizontal: 20
    }
});

export default ProductDetailScreen;