import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Gateway } from '../models/gateways';

@Injectable({
    providedIn: 'root'
})
export class GatewayService {

    url = 'https://api-peripheral-devices.herokuapp.com/api/';
    constructor(private _http: HttpClient) {

    }

    getData():Observable<any>{        
        const headers= new HttpHeaders()
        .set('content-type', 'application/json')
        .set('Access-Control-Allow-Origin', '*');
        
        // return this._http.post(url+'gateway/60e1d8381f7bd224c4a33f2d',  params, {headers: headers, responseType: 'json'})
        return this._http.get(this.url + `gateways`,  {headers: headers, responseType: 'json'});
        
    }

    register(gateway: Gateway){
        const headers= new HttpHeaders().set('content-type', 'application/json');        
        return this._http.post(this.url+`register-gateway`,  gateway, {headers: headers})        
    }

    registerDevice(device: any){
        const headers= new HttpHeaders().set('content-type', 'application/json');        
        return this._http.post(this.url+`register-device`,  device, {headers: headers})        
    }

    remove(periphId: string){
        const headers= new HttpHeaders().set('content-type', 'application/json');
        return this._http.post(this.url+`remove-gateway`,  {periphId}, {headers: headers})        
    }

    removeDevice(periphId: string, deviceId: string){
        const headers= new HttpHeaders().set('content-type', 'application/json');
        return this._http.post(this.url+`remove-device`,  {periphId, deviceId}, {headers: headers})        
    }
}