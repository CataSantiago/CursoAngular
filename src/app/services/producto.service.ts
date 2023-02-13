import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';
import { GLOBAL } from './global';

@Injectable()

export class ProductoService{
	public url:string;

	constructor(
			private _http: HttpClient
		){
		this.url = GLOBAL.url;
	}

	getProducto(): Observable<any>{
		return this._http.get(this.url+'productos').pipe(map(res => res));
	}

	getProductoDetail(id: number){
		return this._http.get(this.url+'producto/'+id).pipe(map(res => res));
	}

	addProducto(producto: Producto){
		let json = JSON.stringify(producto);
		let params = json;
		let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});
		return this._http.post(this.url+'productos',params,{headers});
	}

	editProducto(id: number, producto: Producto){
		let json = JSON.stringify(producto);
		let params = "json="+json;
		let headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'});

		return this._http.post(this.url+'update-producto/'+id, params, {headers})
						 .pipe(map(res => res));
	}

	deleteProducto(id: number){
		return this._http.get(this.url+'delete-producto/'+id)
				.pipe(map(res => res));
	}

	makeFileRequest(url: string,params: Array<string>,files: Array<File>){
		return new Promise<any>((resolve, reject)=>{
			var formData: any = new FormData();
			var xhr = new XMLHttpRequest();
			for(var i = 0; i < files.length; i++){
				formData.append('uploads[]',files[i], files[i].name);
			}

			xhr.onreadystatechange = function(){
				if(xhr.readyState == 4){
					if(xhr.status == 200){
						console.log(xhr.status);
						resolve(JSON.parse(xhr.response));
					}else{
						console.log(xhr.status);
						reject(xhr.response);
					}
				}
			};

			xhr.open("POST", url, true);
			xhr.send(formData);

		});
	}

}