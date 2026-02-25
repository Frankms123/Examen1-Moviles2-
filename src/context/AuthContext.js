import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStorageData();
    }, []);

    const loadStorageData = async () => {
        try {
            const storedToken = await AsyncStorage.getItem('@FakeStore:token');
            const storedUser = await AsyncStorage.getItem('@FakeStore:user');

            if (storedToken && storedUser) {
                setToken(storedToken);
                setUser(JSON.parse(storedUser));
            }
        } catch (e) {
            console.error('Failed to load storage data', e);
        } finally {
            setLoading(false);
        }
    };

    /**
   * Realiza la autenticación del usuario contra la API.
   * Si tiene éxito, almacena el token y los datos del usuario localmente.
   * @param {string} username - Nombre del usuario (Ej: mor_2314).
   * @param {string} password - Contraseña del usuario.
   * @returns {Promise<Object>} Resultado de la operación {success: boolean, error?: string}.
   */
    const login = async (username, password) => {
        try {
            const response = await api.post('/auth/login', { username, password });
            const { token: receivedToken } = response.data;

            const userObj = { username };

            setToken(receivedToken);
            setUser(userObj);

            await AsyncStorage.setItem('@FakeStore:token', receivedToken);
            await AsyncStorage.setItem('@FakeStore:user', JSON.stringify(userObj));

            return { success: true };
        } catch (e) {
            return { success: false, error: e.response?.data || 'Login failed' };
        }
    };

    /**
   * Cierra la sesión activa eliminando los datos del almacenamiento local y limpiando el estado.
   */
    const logout = async () => {
        await AsyncStorage.removeItem('@FakeStore:token');
        await AsyncStorage.removeItem('@FakeStore:user');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
