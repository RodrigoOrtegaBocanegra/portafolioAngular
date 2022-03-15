import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';
import { stringify } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: any[] = [];
  productosFiltrado: Producto[] = [];

  constructor(private http:HttpClient) { 
    this.cargarProductos();
  }


  private cargarProductos(){

    return new Promise( (resolve, reject) => {

      this.http.get('https://angular-html-ea99e-default-rtdb.firebaseio.com/productos_idx.json').subscribe( (resp: any) => {
        this.productos = resp;
        this.cargando = false;
      });
    });

  }

  getProducto(id:String){
    return this.http.get(`https://angular-html-ea99e-default-rtdb.firebaseio.com/productos/${id}.json`)
  }

  buscarProducto(termino: string){

    if( this.productos.length === 0){
      //cargarProductos
      this.cargarProductos().then( () => {
        //Ejectutar despues de cargar los productos
        this.filtrarProductos(termino);
      });

    }else{
      //Aplicar filtro
      this.filtrarProductos(termino);
    }

  }

  private filtrarProductos( termino: string){
    this.productosFiltrado = [];
    termino = termino.toLocaleLowerCase();

    

    this.productos.forEach( prod => {

      const titulo = prod.titulo;
      const tituloLower = titulo.toLocaleLowerCase();
      
      if(prod.categoria.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0){
        this.productosFiltrado.push(prod);
      }

    });    

  }


}
