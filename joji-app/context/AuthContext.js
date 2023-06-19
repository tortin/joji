import React, {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios';
import { BASE_URL } from '../config';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    
    const [isLoading, setIsLoading] = useState(false);
    const [token, setToken] = useState(null);

    const login = (email, password) => {
        console.log(email, password)
        setIsLoading(true);
        axios.post(`${BASE_URL}/api/token/`, 
        {
            "email": email,
            "password": password
        }
        )
        .then(response => {
            let tokens = response.data
            console.log(tokens)
            setToken(tokens.access)
            AsyncStorage.setItem('token', tokens.access)

        })
        .catch(e => {
            console.log(e)
        })

        setIsLoading(false);
    }

    const logout = () => {
        setIsLoading(true)
        setToken(null)
        AsyncStorage.removeItem('token')
        setIsLoading(false)
    }

    const isLoggedIn = async() => {
        try {
            setIsLoading(true)
            let token = await AsyncStorage.getItem('token')
            setToken(token)
            setIsLoading(false)
        } catch(e) {
            console.log(`Login error: ${e}`)
        }
    }

    useEffect(() => {
        isLoggedIn()
    }, [])
    
    return (
        <AuthContext.Provider value={{login, logout, isLoading, token}}>
            {children}
        </AuthContext.Provider>
    )
}