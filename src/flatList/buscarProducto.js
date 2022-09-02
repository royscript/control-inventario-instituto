import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { SearchBar } from 'react-native-elements';
const BuscarProducto = ({filtrar, buscar})=>{
    return(
            <View >
                <SearchBar
                    placeholder="Buscar aquí... nombres, apellidos, rut, curso"
                    onChangeText={(value)=>filtrar(value)}
                    value={buscar}
                />
            </View>
    );
}
export default BuscarProducto;