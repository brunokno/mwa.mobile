import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from '@angular/http'; //, Headers, RequestOptions
import { Observable } from 'rxjs/Observable';
import { Header } from "ionic-angular";

@Injectable()
export class DataService{
    private serviceUrl: string ="http://localhost:53092/";
    
    constructor(public http:Http) {
        
    }

    authenticate(data: any){
        var dt = "grant_type=password&username=" + data.username + "&password=" + data.password;
        let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        let options = new RequestOptions({ headers: headers });
        return this.http
        .post(this.serviceUrl + 'v1/authenticate', dt, options)
        .map((res: Response) => res.json());        
    }

    getProducts(){
        var token = localStorage.getItem('mws.token');
        let headers = new Headers({'Content-Type':'application/json'});
        headers.append('Authorization',`Bearer ${token}`)
        let options = new RequestOptions({headers:headers});
        return this.http
            .get(this.serviceUrl + 'v1/products',options)
            .map((res: Response) => res.json());
    }

    createOrder(data:any){
        var token = localStorage.getItem('mws.token');
        let headers = new Headers({ 'Content-Type': 'application/json' });
        headers.append('Authorization', `Bearer ${token}`); Headers
        let options = new RequestOptions({ headers: headers });
        return this.http
            .post(this.serviceUrl + 'v1/orders', data, options)
            .map((res: Response) => res.json());
    }
}