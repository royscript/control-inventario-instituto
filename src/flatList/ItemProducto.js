import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
const styles = StyleSheet.create({
      listItem:{
          margin:10,
          padding:10,
          width:"95%",
          flex:1,
          alignSelf:"center",
          flexDirection:"row",
          borderRadius:5,
          backgroundColor : '#FFF'
      }
})

/*
<Image source={{uri:`https:\/\/drive.google.com\/uc?id=${item.foto}`}}  style={{width:60, height:60,borderRadius:30}} />
*/
function ItemProducto({ item,index, mostrarDetalles }) {
  return (
    <TouchableOpacity onPress={()=>{
              mostrarDetalles(item);
          }}>
      <View style={styles.listItem}>
        <Text style={{backgroundColor:'#4285f4', color:'#fff', textAlign:'center',borderRadius:30, width:20, height:20, top:50}}>{index+1}</Text>
        
        <View style={{alignItems:"center",flex:1}}>
          <Text style={{fontWeight:"bold"}}>{item.nombreProducto}</Text>
          <Text style={{fontWeight:"bold", color:"black"}}>{item.idProducto}</Text>
          <Text>Cantidad : {item.cantidadProducto}</Text>
          <Text>Bodega : {item.nombreBodega}</Text>
          <Text>Fila : {item.numeroFila}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
export default ItemProducto;