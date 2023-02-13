import {Component} from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';

import {ProductoService} from '../services/producto.service';
import {Producto} from '../models/producto';

type ProductResponse = { //O el nombre que quieras
  status: string,
  code: number,
  message: string,
  data: any
}

@Component ({
	selector: 'producto-detail',
	templateUrl: '../views/producto-detail.html',
	providers: [ProductoService]
})

export class ProductoDetailComponent{
	public producto!: Producto;

	constructor(
		private _productoService: ProductoService,
		private _route: ActivatedRoute,
		private _router: Router
	){}

	ngOnInit(){
		console.log('producto-detail.component.ts cargado');

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
