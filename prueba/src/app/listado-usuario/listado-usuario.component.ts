import { Component, OnInit } from '@angular/core';
import { llamadaSimuladaService } from '../llamada-simulada.service';
import swal from 'sweetalert2';
import * as $ from "jquery";
@Component({
  selector: 'app-listado-usuario',
  templateUrl: './listado-usuario.component.html',
  styleUrls: ['./listado-usuario.component.css']
})

export class ListadoUsuarioComponent implements OnInit {
  //Creación de variables
  arrayNombreUsuario: string[] = [];
  arrayNombre: string[] = [];
  arrayApellido1: string[] = [];
  arrayApellido2: string[] = [];
  arrayEmail: string[] = [];
  page!: number;
  usuarios: any;
  selectedOption: string = '-1';
  searchText: string = '';

  constructor(private servicio: llamadaSimuladaService) { }

  ngOnInit(): void {
    //Llamada get a json para obtener los datos con los que vamos a rellenar la tabla la tabla
    this.servicio.get(`${(window as any).rutas.obtenerListado}`).subscribe(respuesta => {      
      let userStrr = JSON.stringify(respuesta);
      let datos = JSON.parse(userStrr);
      var usuario = datos.usuarios;
      this.usuarios = usuario;
    });   
    
    //Función para borrar el contenido de los inputs cuando se pulse el botón enviar
    $("#enviar").on("click", function(){
      $(".form-group > input").val("");
    })

    $("#buscar").on("click", function(){
      $(".busca").val("");      
    })
    
  }

  //Función con los que vamos a enviar los valores del formulario
  public enviarDatos(){
    //Recogemos los valore del formulario introducidos por el usuario
    var name = (<HTMLInputElement>document.getElementById("nombre")).value;
    var surname1 = (<HTMLInputElement>document.getElementById("apellido1")).value;
    var surname2 = (<HTMLInputElement>document.getElementById("apellido2")).value;
    var email = (<HTMLInputElement>document.getElementById("correo")).value;  

    //Validación para que ni haya ningún campo vacío
    if(name == "" || surname1 == "" || surname2 == "" || email == ""){
      swal.fire({
        icon: 'error',
        title: 'Tiene que rellenar todos los campos',          
      });
    }else{
      //Almacenamos los datos del usuario
      let data ={
        email,
        name,
        surname1,
        surname2,
      }
      //Llamada post en la que guardamos en el array de los usuarios el nuevo usuario
      this.servicio.post(`${(window as any).rutas.backendURL}`, data).subscribe((respuesta =>{
        console.log(respuesta);
        this.usuarios.push(respuesta);  

        swal.fire({
          icon: 'success',
          title: 'Usuario insertado correctamente',          
        });      
      }))
      
    }    
  }
  public buscarUsuario(){
    // Validaciones iniciales para asegurar que se ha seleccionado un filtro y se ha ingresado texto de búsqueda
    if (this.selectedOption === '-1' && this.searchText.trim() === '') {
      swal.fire({
        icon: 'error',
        title: 'Tiene que seleccionar un filtro y rellenar el campo',
      });
      return; // Salir de la función si no se cumplen las condiciones iniciales
    } else if (this.selectedOption === '-1') {
      swal.fire({
        icon: 'error',
        title: 'Tiene que seleccionar un filtro',
      });
      return; // Salir de la función si no se ha seleccionado un filtro
    } else if (this.searchText.trim() === '') {
      swal.fire({
        icon: 'error',
        title: 'Tiene que rellenar el campo',
      });
      return; // Salir de la función si el campo de búsqueda está vacío
    }

    // Filtrar la lista de usuarios basándose en el filtro seleccionado y el texto de búsqueda
    const encontrados = this.usuarios.filter((usuario: { name: string; surname1: string; surname2: string; email: string; }) => {
      const textoBusqueda = this.searchText.trim().toLowerCase();
      if (this.selectedOption === "nombre") {
        return usuario.name.toLowerCase()===textoBusqueda;
      } else if (this.selectedOption === "apellido1") {
        return usuario.surname1.toLowerCase()===textoBusqueda;
      } else if (this.selectedOption === "apellido2") {
        return usuario.surname2.toLowerCase()===textoBusqueda;
      } else if (this.selectedOption === "email") {
        return usuario.email.toLowerCase()===textoBusqueda;
      }
      return false; // Retornar falso si ninguna condición se cumple
    });

    // Mostrar resultados basados en si se encontraron usuarios o no
    if (encontrados.length > 0) {
      // Construir el mensaje con los usuarios encontrados
      let mensajeUsuarios = encontrados.map((usuario: { name: any; surname1: any; surname2: any; email: any; }) =>
        `Usuario: ${usuario.name}, Apellidos: ${usuario.surname1} ${usuario.surname2}, Email: ${usuario.email}`
      ).join('<br>'); // Formatear cada usuario encontrado para mostrar en la alerta

      swal.fire({
        icon: 'success',
        title: 'Usuarios encontrados',
        html: mensajeUsuarios // Mostrar los usuarios encontrados
      });
      this.selectedOption = "-1";
      
    } else {
      swal.fire({
        icon: 'error',
        title: 'Usuario no encontrado con el filtro seleccionado',
      });
    }
  }
  
}
