import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { ShoppingCart, LogOut } from 'lucide-react-native';
import api from '../api';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const ProductListScreen = ({ navigation }) => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(true);
    const { logout, user } = useContext(AuthContext);
    const { cart } = useContext(CartContext);

    useEffect(() => {
        fetchData();
    }, []);

    /**
     * Obtiene la lista de productos y categorías desde la API de forma paralela.
     * Actualiza los estados de productos, categorías y el estado de carga.
     */
    const fetchData = async () => {
        try {
            const [prodRes, catRes] = await Promise.all([
                api.get('/products'),
                api.get('/products/categories')
            ]);
            setProducts(prodRes.data);
            setCategories(['all', ...catRes.data]);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    /**
     * Filtra los productos localmente basándose en la categoría seleccionada por el usuario.
     */
    const filteredProducts = selectedCategory === 'all'
        ? products
        : products.filter(p => p.category === selectedCategory);

    const renderProduct = ({ item }) => (
        <TouchableOpacity
            style={styles.productCard}
            onPress={() => navigation.navigate('Details', { product: item })}
        >
            <Image source={{ uri: item.image }} style={styles.productImage} resizeMode="contain" />
            <View style={styles.productInfo}>
                <Text style={styles.productTitle} numberOfLines={2}>{item.title}</Text>
                <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
            </View>
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#000" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                    <Text style={styles.welcomeText}>Hello, {user?.username}</Text>
                    <Text style={styles.headerSubtitle}>Primera Prueba Parcial</Text>
                    <Text style={styles.headerDev}>Desarrolla por: Merlina Addams</Text>
                </View>
                <View style={styles.headerButtons}>
                    <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Cart')}>
                        <ShoppingCart color="#fff" size={24} />
                        {cart.length > 0 && (
                            <View style={styles.badge}>
                                <Text style={styles.badgeText}>{cart.length}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton} onPress={logout}>
                        <LogOut color="#fff" size={24} />
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.filterContainer}>
                <Text style={styles.filterLabel}>Categoría:</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesScroll}>
                    {categories.map((cat) => (
                        <TouchableOpacity
                            key={cat}
                            style={[styles.categoryPill, selectedCategory === cat && styles.categoryPillActive]}
                            onPress={() => setSelectedCategory(cat)}
                        >
                            <Text style={[styles.categoryText, selectedCategory === cat && styles.categoryTextActive]}>
                                {cat.charAt(0).toUpperCase() + cat.slice(1)}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </View>

            <FlatList
                data={filteredProducts}
                renderItem={renderProduct}
                keyExtractor={item => item.id.toString()}
                numColumns={2}
                contentContainerStyle={styles.listContainer}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#5DADE2',
        borderBottomWidth: 0,
    },
    welcomeText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    headerSubtitle: {
        fontSize: 14,
        color: 'rgba(255,255,255,0.9)',
    },
    headerDev: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.8)',
        fontStyle: 'italic',
    },
    headerButtons: {
        flexDirection: 'row',
    },
    iconButton: {
        marginLeft: 15,
        position: 'relative',
    },
    badge: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: 'red',
        borderRadius: 10,
        width: 18,
        height: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    badgeText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    },
    filterContainer: {
        paddingVertical: 15,
        paddingLeft: 20,
    },
    filterLabel: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
    },
    categoriesScroll: {
        flexDirection: 'row',
    },
    categoryPill: {
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
        marginRight: 10,
    },
    categoryPillActive: {
        backgroundColor: '#000',
    },
    categoryText: {
        color: '#666',
    },
    categoryTextActive: {
        color: '#fff',
        fontWeight: 'bold',
    },
    listContainer: {
        padding: 10,
    },
    productCard: {
        flex: 1,
        backgroundColor: '#fff',
        margin: 8,
        borderRadius: 15,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#f0f0f0',
    },
    productImage: {
        width: '100%',
        height: 120,
        marginBottom: 10,
    },
    productInfo: {
        flex: 1,
    },
    productTitle: {
        fontSize: 14,
        fontWeight: '500',
        height: 40,
    },
    productPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
        color: '#000',
    },
});

export default ProductListScreen;
