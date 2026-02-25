import React, { useContext } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Star, ShoppingCart } from 'lucide-react-native';
import { CartContext } from '../context/CartContext';

const ProductDetailScreen = ({ route, navigation }) => {
    const { product } = route.params;
    const { addToCart } = useContext(CartContext);

    const handleAddToCart = () => {
        addToCart(product);
        Alert.alert(
            'Added to Cart',
            `${product.title} has been added to your shopping cart.`,
            [
                { text: 'Continue Shopping' },
                { text: 'Go to Cart', onPress: () => navigation.navigate('Cart') }
            ]
        );
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: product.image }} style={styles.image} resizeMode="contain" />
            </View>

            <View style={styles.content}>
                <Text style={styles.category}>{product.category.toUpperCase()}</Text>
                <Text style={styles.title}>{product.title}</Text>

                <View style={styles.ratingContainer}>
                    <Star color="#FFD700" fill="#FFD700" size={18} />
                    <Text style={styles.ratingText}>{product.rating?.rate || '4.5'} ({product.rating?.count || '120'} reviews)</Text>
                </View>

                <Text style={styles.price}>${product.price.toFixed(2)}</Text>

                <View style={styles.divider} />

                <Text style={styles.descriptionTitle}>Description</Text>
                <Text style={styles.description}>{product.description}</Text>

                <TouchableOpacity style={styles.buyButton} onPress={handleAddToCart}>
                    <ShoppingCart color="#fff" size={24} style={styles.buttonIcon} />
                    <Text style={styles.buyButtonText}>Comprar producto</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    imageContainer: {
        backgroundColor: '#fff',
        padding: 20,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    image: {
        width: '100%',
        height: 300,
    },
    content: {
        padding: 25,
    },
    category: {
        fontSize: 12,
        color: '#888',
        letterSpacing: 1.5,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    ratingText: {
        marginLeft: 8,
        color: '#666',
        fontSize: 14,
    },
    price: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 20,
    },
    divider: {
        height: 1,
        backgroundColor: '#f0f0f0',
        marginBottom: 20,
    },
    descriptionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        color: '#444',
        lineHeight: 24,
        marginBottom: 30,
    },
    buyButton: {
        backgroundColor: '#000',
        borderRadius: 15,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30,
    },
    buttonIcon: {
        marginRight: 10,
    },
    buyButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ProductDetailScreen;
