import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login'
import CadastroOng from './cadastroOng'
import Navbar from './Navbar';
import { UserContext } from '../context/UserContext';
import { TokenContext } from '../context/TokenContext';

const Stack = createNativeStackNavigator();

export default function NavigationSession() {
    const [userData, setUserData] = useState(null);
    const [token, setToken] = useState('');

    if (!userData) {
        return (
            <NavigationContainer>
                <UserContext.Provider value={{ userData, setUserData }}>
                    <TokenContext.Provider value={{ token, setToken }}>
                        <Stack.Navigator
                            initialRouteName="Login"
                            screenOptions={{
                                headerShown: false,
                                headerTitleStyle: {
                                    fontSize: 22,
                                    fontWeight: "bold"
                                }
                            }}
                        >
                            <Stack.Screen
                                name="Login"
                                component={Login}
                                options={{ title: "Login" }}
                            />
                            <Stack.Screen
                                name="Cadastro"
                                component={CadastroOng}
                                options={{
                                    title: 'Cadastrar Ong',
                                    headerShown: true,
                                }}
                            />
                        </Stack.Navigator>
                    </TokenContext.Provider>
                </UserContext.Provider>
                <StatusBar barStyle="default" />
            </NavigationContainer>
        );
    }

    if (userData) {
        return (
            <NavigationContainer>
                <UserContext.Provider value={{ userData, setUserData }}>
                    <TokenContext.Provider value={{ token, setToken }}>
                        <Navbar />
                    </TokenContext.Provider>
                </UserContext.Provider>
            </NavigationContainer>
        );
    }
}