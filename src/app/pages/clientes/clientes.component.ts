import {Component, OnInit} from '@angular/core';
import {ClienteService} from 'src/app/services/cliente.service';
import {ClienteModel} from 'src/app/models/cliente.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: ClienteModel[] = [];
  promedio = 0;
  desviacion: number;
  sumaEdades = 0;

  constructor(private clientesService: ClienteService) {
  }

  ngOnInit() {
    this.clientesService.getClientes()
      .subscribe(resp => {
        this.clientes = resp;
        this.promEdades(this.clientes);
        this.desvEstandar(this.clientes);
      });
  }

  borrarCliente(cliente: ClienteModel, i: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Desea eliminar a ${cliente.name} `,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {
      if (resp.value) {
        this.clientes.splice(i, 1);
        this.clientesService.borrarCliente(cliente.id).subscribe();
      }
    });
  }

  promEdades(clientes: ClienteModel[]) {
    clientes.forEach(val => this.sumaEdades += val.age);
    if (clientes.length > 0) {
      this.promedio = this.sumaEdades / clientes.length;
    }
  }

  desvEstandar(clientes: ClienteModel[]) {
    let sumatoria = 0;
    clientes.forEach(val => {
      sumatoria += Math.pow(val.age - this.promedio, 2);
    });
    this.desviacion = Math.sqrt(sumatoria / clientes.length);
  }


}
