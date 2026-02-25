import React, { useState, useContext } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { AuthContext } from '../context/AuthContext';

/**
 * Pantalla de autenticación de usuario.
 * Maneja la entrada de credenciales y la redirección inicial.
 */
/**
 * Muestra la información detallada de un producto seleccionado.
 * Permite al usuario agregar el producto al carrito de compras.
 */
const ProductDetailScreen = ({ route, navigation }) => {
    const [username, setUsername] = useState('mor_2314');
    const [password, setPassword] = useState('83r5^_');  //lo agregue aqui oara sea el usuario por defecto por defecto
    const { login } = useContext(AuthContext);

    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert('Error', 'Please enter username and password');
            return;
        }
        try {
            const result = await login(username, password);
            if (!result.success) {
                Alert.alert('Login Failed', result.error);
            }
        } catch (e) {
            console.error('Login error detail:', e.response?.data || e.errorMessage || e.message);
            Alert.alert('Login Failed', e.response?.data?.message || e.message || 'An unexpected error occurred.');
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.card}>
                <Text style={styles.title}>Fake Store</Text>
                <Text style={styles.subtitle}>Welcome Back</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const LoginScreen = () => {
    const [username, setUsername] = useState('mor_2314');
    const [password, setPassword] = useState('83r5^_');  //lo agregue aqui oara sea el usuario por defecto por defecto
    const { login } = useContext(AuthContext);

    const handleLogin = async () => {
        if (!username || !password) {
            Alert.alert('Error', 'Please enter username and password');
            return;
        }
        try {
            const result = await login(username, password);
            if (!result.success) {
                Alert.alert('Login Failed', result.error);
            }
        } catch (e) {
            console.error('Login error detail:', e.response?.data || e.errorMessage || e.message);
            Alert.alert('Login Failed', e.response?.data?.message || e.message || 'An unexpected error occurred.');
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.card}>
                <Text style={styles.title}>Fake Store</Text>
                <Text style={styles.subtitle}>Welcome Back</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                />

                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        padding: 20,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 30,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 30,
    },
    input: {
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#eee',
    },
    button: {
        backgroundColor: '#000',
        borderRadius: 10,
        padding: 18,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default LoginScreen;
