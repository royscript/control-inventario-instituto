import postData from "../api/fetch";
class Producto{
    constructor(){
        this.idSheet = "1T1Bn8QU3BLs0k06unSFNMlfZePAClYC17Zb-lCOREX4";
        this.Producto = {
            hoja : 'Producto',
            atributos : ["idProducto","nombreProducto","cantidadProducto","nombreBodega","idBodega","foto"]
        }
        this.pk = "idProducto";
    }
    getEntidad(){
        return this.Producto;
    }
    async listar(){
        var entidades = new Array();
        entidades.push(this.Producto);
        const data = await postData("/sheet/listar", 
                                    { 
                                      idSheet : this.idSheet, 
                                      entidades,
                                      sql : "Select * from Producto order by numeroFila desc"
                                    });
        return data;
    }
    async insertar(registrosIngresar){
        const data = await postData("/sheet/insertar", 
                                    { 
                                        idSheet : this.idSheet, 
                                        registrosIngresar, 
                                        nombreHojaSheet : this.Producto.hoja 
                                    });
        return data;
    }
    async modificar(registrosModificar,idModificar){
        const data = await postData("/sheet/modificar", 
                                    { 
                                        idSheet : this.idSheet, 
                                        entidad: this.Producto, 
                                        registrosModificar, nombreIdCampoModificar : 
                                        this.pk, idModificar 
                                    });
        return data;
    }
    async eliminar(idEliminar){
        const data = await postData("/sheet/eliminar", 
                                    { 
                                        idSheet : this.idSheet, 
                                        entidad: this.Producto, 
                                        nombreIdEliminar : this.pk, 
                                        idEliminar 
                                    });
        return data;
    }
}
export default Producto;