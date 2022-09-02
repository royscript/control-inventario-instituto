import { Text, Button } from "react-native";
const DetalleProducto = ({ navigation, route })=>{
    const {datos} = route.params;
    return (
        <>
            <Text>Nombre Producto : {datos.nombreProducto}</Text>
            <Text>Codigo Producto : {datos.idProducto}</Text>
            <Text>Bodega : {datos.nombreBodega}</Text>
            <Text>Cantidad : {datos.cantidadProducto}</Text>
            <Button
                title={"Modificar"}
                onPress={()=>{
                    console.log("Click Modificar");
                }}
            />
        </>
    )
}
export default DetalleProducto;