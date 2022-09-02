import { useState, useEffect} from "react";
import { Text, StyleSheet, Button, View } from "react-native";
import ListaProductos from "./flatList/ListaProductos";
import Producto from "./modelo/Producto";
var objetoProducto = new Producto();

const Inicio = ({navigation, route})=>{
    const [data, setData] = useState([]);
    const [cargando, setCargando] = useState(false);
    const listar = async ()=>{
        setCargando(true);
        const data = await objetoProducto.listar();
        setData(data)
        setCargando(false);
    }
    const editar = async ()=>{
        setCargando(true);
        const data = await objetoProducto.modificar({ "nombreProducto" : 'tomates'},5);
        setCargando(false);
    }
    const eliminar = async ()=>{
        setCargando(true);
        const data = await objetoProducto.eliminar(10);
        setCargando(false);
    }
    useEffect(()=>{
        if(route.params.cargarDatos===true){
            listar();
        }
    },[route.params]);
    const mostrarDetalles = (item)=>{
        console.log(item);
        navigation.navigate('DetalleProducto',{datos : item});
    }
    return (
        <>
            <View style={styles.container}>
                <View style={styles.buttonContainer}>
                    <Button
                        title="Buscar"
                        onPress={()=>{
                            listar();
                        }}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        title="Insertar"
                        onPress={
                            ()=>{
                                navigation.navigate('IngresarProducto');
                            }
                        }
                    />
                </View>
            </View>
            <Text>Cantidad de Registros</Text>
            <Text>{cargando===true?'Cargando Registros':''}</Text>
            <ListaProductos
                productos={data}
                mostrarDetalles={mostrarDetalles}
            />
        </>
    )
}
export default Inicio;
const styles = StyleSheet.create({
    container: {
      flex: 0.1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height : 10
    },
    buttonContainer: {
      flex: 1,
      top : 0
    }
  });