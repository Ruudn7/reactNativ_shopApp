import React from 'react';
import {
    ScrollView,
    View,
    Text,
    Button,
    Image,
    StyleSheet
} from 'react-native';

import { useSelector } from 'react-redux';
import Colors from '../../constans/Colors';

const ProductDetailScreen = props => {
    const productId = props.navigation.getParam('productId')
    const selectedProduct = useSelector(state => {
        return state.products.availableProducts.find(prod => prod.id === productId)
    })

    return (
        <ScrollView>
            <Image source={{uri: selectedProduct.imageUrl}} style={styles.image} />
            <View style={styles.actions}>
                <Button
                    color={Colors.primary}
                    title='To Cart'
                    onPress={props.onAddToCart}
                />
            </View>
            <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
            <Text style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>

    )
};

ProductDetailScreen.navigationOptions = navData => {
    console.log(navData.navigation.getParam('productTitle'))
    return {
        headerTitle: navData.navigation.getParam('productTitle')
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