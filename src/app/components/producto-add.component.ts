import { Component } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto';
import { GLOBAL } from '../services/global';

type ProductResponse = { //O el nombre que quieras
  status: string,
  code: number,
  message: string
}



@Component({
	selector: 'producto-add',
	templateUrl: '../views/producto-add.html',
	providers: [ProductoService]
})

export class ProductoAddComponent{
	public titulo: string;
	public producto: Producto;
	public filesToUpload: any;
	public resultUpload: any;
	public is_edit: any;


	constructor(
			private _productoService: ProductoService,
			private _route: ActivatedRoute,
			private _router: Router

		){
		this.titulo = 'Crear un nuevo producto';
		this.producto = new Producto(0,'','',0,'');
	}

	ngOnInit(){
		console.log('producto-add.component.ts cargado...');
	}

	/*onSubmit(){
		console.log(this.producto);

		if(this.filesToUpload && this.filesToUpload.length >= 1){
			
			console.log(this.filesToUpload.length);
			this._productoService.makeFileRequest(GLOBAL.url+'upload-file', [], this.filesToUpload).then((result) => {
				console.log(result);
				/*this.resultUpload = result;
				this.producto.imagen = this.resultUpload.filename;
				this.saveProducto();
			}, (error) =>{
				console.log(this.producto);
			});
			this._productoService.addProducto(new Producto(this.producto.id,this.producto.nombre,this.producto.descripcion,this.producto.precio,this.producto.imagen)).subscribe(
				res =>{
					const response: ProductResponse = res as ProductResponse;
					if(response.code == 200){
						this._router.navigate(['/productos']);
					}else{
						console.log(response);
					}
				},
				error =>{
					console.log(<any>error);
				}	
			);
		}else{
			this.saveProducto();
		}
		
	}*/

onSubmit(){
		console.log(this.producto);

		if(this.filesToUpload && this.filesToUpload.length >= 1){
			this._productoService.makeFileRequest(GLOBAL.url+'upload-file', [], this.filesToUpload).then((result) => {
				console.log(result);

				this.resultUpload = result;
				this.producto.imagen = this.resultUpload.filename;
				this.saveProducto();

			}, (error) =>{
				console.log(error);
			});
		}else{
			this.saveProducto();	
		}

	}

	saveProducto(){
			this._productoService.addProducto(new Producto(this.producto.id,this.producto.nombre,this.producto.descripcion,this.producto.precio,this.producto.imagen)).subscribe(
				res =>{
					const response: ProductResponse = res as ProductResponse;
					if(response.code == 200){
						this._router.navigate(['/productos']);
					}else{
						console.log(response);
					}
				},
				error => {
					console.log(<any>error);
				}
			);
	}



	fileChangeEvent(fileInput: any){
		this.filesToUpload = <Array<File>>fileInput.target.files;
		console.log(this.filesToUpload);
	}

}

