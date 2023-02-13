import {Component} from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';
import {ProductoService} from '../services/producto.service';
import {Producto} from '../models/producto';
import {GLOBAL} from '../services/global';

type ProductResponse = { //O el nombre que quieras
  status: string,
  code: number,
  message: string,
  data: Producto
}

@Component({
	selector: 'producto-edit',
	templateUrl: '../views/producto-add.html',
	providers: [ProductoService]
})
export class ProductoEditComponent{
	public titulo: string;
	public producto: Producto;
	public filesToUpload: any;
	public resultUpload: any;
	public is_edit: any;

	constructor (
		private _productoService: ProductoService,
		private _route: ActivatedRoute,
		private _router: Router
	){
		this.titulo = 'Editar producto';
		this.producto = new Producto(1,'','',1,'');
		this.is_edit = true;
	}

	onSubmit(){
		console.log(this.producto);

		if(this.filesToUpload && this.filesToUpload.length >= 1){
			this._productoService.makeFileRequest(GLOBAL.url+'upload-file', [], this.filesToUpload).then((result) => {
				console.log(result);

				this.resultUpload = result;
				this.producto.imagen = this.resultUpload.filename;
				this.updateProducto();

			}, (error) =>{
				console.log(error);
			});
		}else{
			this.updateProducto();	
		}

	}

	updateProducto(){
		this._route.params.forEach((params: Params) => {
			let id = params['id'];

			this._productoService.editProducto(id, this.producto).subscribe(
				res => {
					const response: ProductResponse = res as ProductResponse;
					if(response.code == 200){
						this._router.navigate(['/producto', id]);
					}else{
						console.log(response);
					}
				},
				error => {
					console.log(<any>error);
				}
			);
		});
	}



	fileChangeEvent(fileInput: any){
		this.filesToUpload = <Array<File>>fileInput.target.files;
		console.log(this.filesToUpload);
	}

	ngOnInit(){
		console.log(this.titulo);
		this.getProductoDetail();
	}

	getProductoDetail(){
		this._route.params.forEach((params: Params) => {
			let id = params['id'];

			this._productoService.getProductoDetail(id).subscribe(
				res => {
					const response: ProductResponse = res as ProductResponse;
					if(response.code == 200){
						this.producto = response.data;
					}else{
						this._router.navigate(['/productos']);
					}
				},
				error => {
					console.log(<any>error);
				}
			); 
		});
	}
}
