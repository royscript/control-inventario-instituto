import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import Inicio from './src/Inicio';
import IngresarProducto from './src/IngresarProducto';
import DetalleProducto from './src/DetalleProducto';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen name="Inicio" component={Inicio} initialParams={{cargarDatos : true}}/>
        <Stack.Screen name="IngresarProducto" component={IngresarProducto} />
        <Stack.Screen name="DetalleProducto" component={DetalleProducto} initialParams={{item : null}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
