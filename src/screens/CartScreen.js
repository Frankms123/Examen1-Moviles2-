import React, { useContext } from 'react';
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { Trash2, ShoppingBag, XCircle, CreditCard, Plus, Minus } from 'lucide-react-native';
import { CartContext } from '../context/CartContext';

const CartScreen = ({ navigation }) => {
    const { cart, removeFromCart, updateQuantity, clearCart, getSubtotal } = useContext(CartContext);
    const total = getSubtotal();

    const handlePay = () => {
        Alert.alert(
            'Payment Successful',
            'Your order has been placed successfully!',
            [
                {
                    text: 'OK',
                    onPress: () => {
                        clearCart();
                        navigation.navigate('Products');
                    }
                }
            ]
        );
    };

    const handleCancel = () => {
        Alert.alert(
            'Cancel Purchase',
            'Are you sure you want to empty your cart?',
            [
                { text: 'No', style: 'cancel' },
                {
                    text: 'Yes',
                    onPress: () => clearCart()
                }
            ]
        );
    };

    const renderItem = ({ item }) => (
        <View style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.itemImage} resizeMode="contain" />
            <View style={styles.itemInfo}>
                <Text style={styles.itemTitle} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>

                <View style={styles.quantityContainer}>
                    <TouchableOpacity
                        style={styles.qtyButton}
                        onPress={() => updateQuantity(item.id, -1)}
                    >
                        <Minus size={18} color="#000" />
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <TouchableOpacity
                        style={styles.qtyButton}
                        onPress={() => updateQuantity(item.id, 1)}
                    >
                        <Plus size={18} color="#000" />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.itemRight}>
                <Text style={styles.subtotalText}>${(item.price * item.quantity).toFixed(2)}</Text>
                <TouchableOpacity onPress={() => removeFromCart(item.id)}>
                    <Trash2 size={20} color="#ff4444" />
                </TouchableOpacity>
            </View>
        </View>
    );

    if (cart.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <ShoppingBag size={80} color="#ccc" />
                <Text style={styles.emptyText}>Your cart is empty</Text>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.navigate('Products')}
                >
                    <Text style={styles.backButtonText}>Start Shopping</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={cart}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.listContent}
            />

            <View style={styles.footer}>
                <View style={styles.totalRow}>
                    <Text style={styles.totalLabel}>Total a pagar:</Text>
                    <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
                </View>

                <View style={styles.buttonRow}>
                    <TouchableOpacity style={[styles.actionButton, styles.cancelButton]} onPress={handleCancel}>
                        <XCircle color="#ff4444" size={20} />
                        <Text style={styles.cancelButtonText}>Cancelar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.actionButton, styles.payButton]} onPress={handlePay}>
                        <CreditCard color="#fff" size={20} />
                        <Text style={styles.payButtonText}>Pagar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
    },
    listContent: {
        padding: 20,
        paddingBottom: 120,
    },
    cartItem: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 15,
        marginBottom: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 2,
    },
    itemImage: {
        width: 60,
        height: 60,
    },
    itemInfo: {
        flex: 1,
        marginLeft: 15,
    },
    itemTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    itemPrice: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    qtyButton: {
        padding: 5,
    },
    quantityText: {
        paddingHorizontal: 12,
        fontWeight: 'bold',
    },
    itemRight: {
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        height: 60,
    },
    subtotalText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        padding: 25,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -10 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 20,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    totalLabel: {
        fontSize: 18,
        color: '#666',
    },
    totalValue: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#000',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    actionButton: {
        flex: 0.48,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        borderRadius: 12,
    },
    cancelButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ff4444',
    },
    cancelButtonText: {
        color: '#ff4444',
        fontWeight: 'bold',
        marginLeft: 8,
    },
    payButton: {
        backgroundColor: '#000',
    },
    payButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        marginLeft: 8,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    emptyText: {
        fontSize: 18,
        color: '#888',
        marginTop: 20,
        marginBottom: 30,
    },
    backButton: {
        backgroundColor: '#000',
        paddingHorizontal: 30,
        paddingVertical: 15,
        borderRadius: 10,
    },
    backButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default CartScreen;
