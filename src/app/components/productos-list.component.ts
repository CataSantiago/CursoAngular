import {Component} from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto';

type ProductResponse = { //O el nombre que quieras
  status: string,
  code: number,
  message: string
}

@Component({
	selector: 'productos-list',
	templateUrl: '../views/productos-list.html',
	providers: [ProductoService]
})

export class ProductosListComponent{
	public titulo: string;
	public productos: Producto[]=[];
	public confirmado: any;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		private _productoService: ProductoService
	){
		this.titulo = 'Listado de productos';
		this.confirmado = null;
	}

	ngOnInit(){
		console.log('productos-list.component.ts cargado');
		
		this.getProductos();
	}

	getProductos(){
		this._productoService.getProducto().subscribe(
			result => {
				const response: ProductResponse = result as ProductResponse;
				if(result.code != 200){
					console.log(result);
				}else{
					this.productos = result.data;
				}
			},
			error => {
				console.log(<any>error);
			}
		);
	}

	borrarConfirm(id: number){
		this.confirmado = id;
	}

	cancelarConfirm(){
		this.confirmado = null
	}

	onDeleteProducto(id: number){
		this._productoService.deleteProducto(id).subscribe(
				res =>{
					const response: ProductResponse = res as ProductResponse;
					if(response.code == 200){
						this.getProductos();
					}else{
						alert('Error al borrar producto');
					}
				}, 
				error =>{
					console.log(<any>error);
				}
					
			);
	}

}
