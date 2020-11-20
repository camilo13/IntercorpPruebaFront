import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ClienteModel } from '../models/cliente.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private url = 'https://intercorp-b7cac.firebaseio.com/';

  constructor(private http: HttpClient) { }

  crearCliente(cliente: ClienteModel) {

    return this.http.post(`${this.url}/clientes.json`, cliente)
      .pipe(
        map((resp: any) => {
          cliente.id = resp.name;
          return cliente;
        })
      )
  }

  actualizarCliente(cliente: ClienteModel) {
    const clienteTemp = {
      ...cliente
    };
    delete clienteTemp.id;
    return this.http.put(`${this.url}/clientes/${cliente.id}.json`, clienteTemp);
  }

  borrarCliente(id:string) {
    return this.http.delete(`${ this.url }/clientes/${id}.json`);
  }

  getCliente(id:String){
    return this.http.get(`${this.url}/clientes/${id}.json`);
  }

  getClientes() {
    return this.http.get(`${this.url}/clientes.json`)
      .pipe(
        map(this.crearArreglo)
      );
  }

  private crearArreglo(clientesObj: object) {
    const clientes: ClienteModel[] = [];

    if (clientesObj === null) {
      return [];
    }
    Object.keys(clientesObj).forEach(key => {
      const cliente: ClienteModel = clientesObj[key];
      cliente.id = key;
      clientes.push(cliente);
    });
    return clientes;
  }

}