import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../services/productos.service';
import { ProductoDescripcion } from '../../interfaces/producto-descripcion.interface';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  prodId: string = "";
  prod: ProductoDescripcion = {};  

  constructor( private route: ActivatedRoute, 
              public productoService: ProductosService) { }

  ngOnInit(){
    this.route.params
      .subscribe(parametros => {

        //console.log(parametros);
        this.productoService.getProducto(parametros['id'])
        .subscribe( (producto: ProductoDescripcion) =>{
          this.prodId = parametros['id'];
          console.log(producto);
          this.prod = producto;          
        });

      });
  }

}
