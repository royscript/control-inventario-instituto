import { Text, StyleSheet, TextInput, Button, TouchableOpacity, View, SafeAreaView, Image } from "react-native";
import SelectDropdown from 'react-native-select-dropdown';
import { useState, useRef } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from 'expo-camera';
import Producto from "./modelo/Producto";
import { shareAsync } from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
var objetoProducto = new Producto();

const IngresarProducto = ({navigation, route})=>{
    const bodegas = [
        {id : 1, nombre : 'bodega 1'},
        {id : 2, nombre : 'bodega 2'}
    ];
    const [idProducto, setIdProducto] = useState('');
    const [nombreProducto, setNombreProducto] = useState('');
    const [cantidadProducto, setCantidadProducto] = useState('');
    const [idBodega, setIdBodega] = useState('');
    const [estado, setEstado] = useState('');
    //-----------Escaner codigo de barras------------------
    const [permisoCamara, setPermisoCamara] = useState(null);
    const [scanned, setScanned] = useState(null);
    //-----------Tomar Fotos------------------
    const camaraFotoRef = useRef();
    const [permisoCamaraFoto, setPermisoCamaraFoto] = useState();
    const [permisoMediaLibrary, setPermisoMediaLibrary] = useState();
    const [foto, setFoto] = useState();
    //const [tomarFoto, setTomarFoto] = useState();
    const [type, setType] = useState(Camera.Constants.Type.back);


    const insertar = async ()=>{
        setEstado("Guardando los registros ...");
        
        console.log(foto);
        let formdata = new FormData();
        formdata.append('foto', {
            uri: foto.uri,
            type: foto.type,
            name: foto.name,
            b64 : foto.base64
        });
        const datos = [idProducto,nombreProducto, cantidadProducto,'asd',idBodega];
        const files = [
            { nombre : 'foto', base64 : foto.base64}
        ];
        const registrosIngresar = {
            datos,
            files
        };
        const data = await objetoProducto.insertar(registrosIngresar);
        if(data.error===false){
            setEstado(data.respuesta);
            navigation.navigate('Inicio',{cargarDatos : true});
        }else{
            setEstado("");
        }
        
    }
    const activarScaner = async ()=>{
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setPermisoCamara(status==='granted');
    }
    const activarCamara = async ()=>{
        /*const { status } = await Camera.requestCameraPermissionsAsync();
        setTomarFoto(status === 'granted');*/
        const camaraPermiso = await Camera.requestCameraPermissionsAsync();
        const MediaLibraryPermiso = await MediaLibrary.requestPermissionsAsync();
        setPermisoCamaraFoto(camaraPermiso.status === "granted");
        setPermisoMediaLibrary(MediaLibraryPermiso.status === "granted");
    }
    
    const handleBarCodeScanned = ({type, data, result})=>{
        setScanned(true);
        alert(`Se ha detectado un codigo ${type} que tiene la siguiente info ${data}`);
        setIdProducto(data);
        setPermisoCamara(null);
    }
    /*if(permisoCamara===null){
        return <Text>Solicitando Permiso a la camara</Text>;
    }
    if(permisoCamara===false){
        return <Text>Error, no hay acceso a la camara</Text>;
    }*/
    if(permisoCamara===true){
        return (
            <>
                <Text>Escanear codigo de Barra</Text>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    ref={(ref) => {
                        camera = ref;
                      }}
                    style={StyleSheet.absoluteFillObject}
                />
            </>
        )
        
        ;
    }
    let tomarFoto = async ()=>{
        let options = {
            quality : 0.1,
            base64 : true,
            exit : false
        };
        let nuevaFoto = await camaraFotoRef.current.takePictureAsync(options);
        console.log(nuevaFoto);
        console.log(nuevaFoto.uri);
        setFoto(nuevaFoto);
    }
    if(foto){
        let sharePic = ()=>{

        }
        let saveFoto = ()=>{

        }
    }
    if(permisoCamaraFoto===true){
        return (
            <>
                <Camera style={StyleSheet.absoluteFillObject} ref={camaraFotoRef}>
                    <View>
                        <Button
                            title={"Tomar Foto"}
                            onPress={()=>{
                                tomarFoto();
                            }}
                        />
                        <Button
                            title="Cerrar camara"
                            onPress={()=>{
                                setPermisoCamaraFoto(null);
                            }}
                        />
                    </View>
                </Camera>
            </>
        )
        return (
                <>  
                    <Camera style={StyleSheet.absoluteFillObject} type={type} takePictureAsync={async(foto)=>{
                        console.log(foto);
                    }}>
                        <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                            setType(
                                type === Camera.Constants.Type.back
                                ? Camera.Constants.Type.front
                                : Camera.Constants.Type.back
                            );
                            }}>
                            <Text style={styles.text}> Cambiar Camara </Text>
                        </TouchableOpacity>
                        <Button
                            title="Foto"
                            onPress={async()=>{
                                let photo = await Camera.takePictureAsync({ base64: true, quality: 0.5 });
                                console.log(photo);
                            }}
                        />
                        </View>
                    </Camera>
                </>
        );
    }
    return(
        <>
            <Text>Id Producto</Text>
            <TextInput
            style={styles.input}
                onChangeText={(value)=>{
                    setIdProducto(value);
                }}
                onPressIn={()=>{
                    activarScaner();
                    setScanned(false);
                }}
                value={idProducto}
            />
            <Text>Nombre del Producto</Text>
            <TextInput
            style={styles.input}
                onChangeText={(value)=>{
                    setNombreProducto(value);
                }}
                value={nombreProducto}
            />
            <Text>Cantidad Producto</Text>
            <TextInput
                style={styles.input}
                onChangeText={(value)=>{
                    setCantidadProducto(value);
                }}
                value={cantidadProducto}
                keyboardType="numeric"
            />
            <Text>Bodega</Text>
            <SelectDropdown
                style={styles.select}
                data={bodegas}
                onSelect={(selectedItem, index) => {
                    setIdBodega(selectedItem.id);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                    return selectedItem.nombre
                }}
                /* Seleccionar valor por defecto
                    defaultValue={{
                        "id": 1,
                        "nombre": "bodega 1",
                    }}
                  */
                rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item.nombre
                }}
                
            />
            {foto?<Image style={{width : 150, height : 150, alignItems:"center"}} source={{ uri : "data:image/jpg;base64," + foto.base64}}/>:null}
            
            <Button
                title="Tomar Foto"
                onPress={()=>{
                    activarCamara();
                    //setTomarFoto(true);
                }}
            />
            {estado===''?null:<Text>{estado}</Text>}
            <Button
                title="Agregar Producto"
                onPress={()=>{
                    insertar();
                }}
            />
        </>
    )
}
export default IngresarProducto;
const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    select : {
        backgroundColor : '#1A1A1A'
    }
  });