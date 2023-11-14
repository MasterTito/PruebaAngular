No sabía si el listado de búsqueda era para buscar a los usuarios en el listado o si era para insertar usuarios,
así que he hecho uno para buscar en la tabla y otro para insertarlos.

En el enuciado pone "El listado de usuarios se obtendrá de una llamada POST", pero las peticiones POST se usan para enviar datos,
por eso, para mostrar el listado he usado GET. La petición POST la he usado en un formulario para enviar los datos de dicho
formulario a la API simulada.

Para simular la llamada POST he usado json-server. Para iniciarlo hay que situarse en la carpeta "assets" y poner el 
comando "json-server --watch listado.json"

