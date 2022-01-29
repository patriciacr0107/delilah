## Tabla de contenido

- [Tabla de contenido](#tabla-de-contenido)
  - [Informacion General](#informacion-general)
- [Tecnologías](#tecnologías)
- [Instalación](#instalación)
  - [Base de Datos](#base-de-datos)
  - [Servidor](#servidor)
- [Notas de Consumo de la API](#notas-de-consumo-de-la-api)

### Informacion General

---

Delilah Restó - Back-end Server

## Tecnologías

---

Lista de tecnologías usadas en el proyecto:
Node.js
Express.js
MySql
Json Webtoken

## Instalación

---

El archivo config.env contiene los datos de conexión a la BD y secret key para autenticación, modificar con el usuario y password de acceso a MySQL

### Base de Datos

---

En MySql ejecutar los Scripts de la carpeta BD.
El esquema se crea automaticamente
Ésto, creará la estructura de la BD y un usuario Administrador: admin:ABC123

Orden de ejecución

```
delilah_users.sql
delilah_products.sql
delilah_orders.sql
delilah_orderslines.sql
```

### Servidor

Clonar el servidor del repositorio Git
URL:

```
$ git clone https://example.com
$ cd ../path/to/the/file
$ npm install
$ npm run dev
```

## Notas de Consumo de la API

---

Se agrega Collection Postman archivo : DelilahResto.postman_collection.json

El proceso de actualización de pedido se hace de la siguiente forma

Si se desea actualizar los productos de un pedido, se consume el
end-point DELETE Order: Delete Detail [Admin] para borrar el detalle del pedido creado y posteriormente se vuelve a consumir el end-point POST: Order: Order Detail para crear el detalle del pedido nuevamente
