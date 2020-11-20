import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

import {ClienteModel} from 'src/app/models/cliente.model';
import {ClienteService} from 'src/app/services/cliente.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  cliente = new ClienteModel();

  constructor(private clienteServicio: ClienteService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')
    if (id !== 'nuevo') {
      this.clienteServicio.getCliente(id)
        .subscribe((resp: ClienteModel) => {
          this.cliente = resp;
          this.cliente.id = id;
        });

    }
  }

  guardar(form: NgForm) {
    if (form.invalid) {
      Swal.fire({
        title: 'Error',
        text: 'Datos incompletos',
        type: 'error'
      });
      return;
    }

    let peticion: Observable<any>;

    if (this.cliente.fecha_nacimiento){
      const timeDiff = Math.abs(Date.now() - new Date(this.cliente.fecha_nacimiento).getTime());
      this.cliente.age = Math.floor((timeDiff / (1000 * 3600 * 24))/365.25);
    } 

    if (this.cliente.id) {
      peticion = this.clienteServicio.actualizarCliente(this.cliente);
    } else {
      peticion = this.clienteServicio.crearCliente(this.cliente);
    }

    peticion.subscribe(resp => {
      Swal.fire({
        title: this.cliente.name + ' ' + this.cliente.lastname,
        type: 'success'
      });
      form.reset();
    });
  }

}
