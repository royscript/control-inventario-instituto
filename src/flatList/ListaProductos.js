import React, { useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import ItemProducto from './ItemProducto';

const ListaProductos = ({ mostrarDetalles, productos })=> {
    return (
      <>
        <View style={styles.container}>
          <FlatList
            style={{flex:1}}
            data={productos}
            renderItem={({ item, index }) => <ItemProducto item={item} index={index} mostrarDetalles={mostrarDetalles}/>}
            keyExtractor={item => item.idProducto+'-'+Math.random().toString(36).substr(2, 18)}
          />
        </View>
        <View>
          
        </View>
      </>
      
    );
}
 export default ListaProductos;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    marginTop:1,
    marginBottom : 0,
    width : '100%'
  }
});