<template>
    <div>
        <header class="header">
            <div class="d-flex justify-content-end align-items-center px-4">
                <RouterLink class="text-white text-decoration-none text-identif" to="/" id="logout-btn">
                    Cerrar sesión
                </RouterLink>
            </div>
            <h1>🍾 Licorería Express 🍾</h1><br />
        </header>
        <h3 class="text-center p-4">Panel de Administrador</h3>
        <div class="container d-flex justify-content-between align-items-center p-3">
            <h4 class="text-left">Listado de Productos</h4>
            <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalProducto">
                <i class="fa fa-plus"></i>
                Nuevo Pedido
            </button>
        </div>

        <div class="container">
            <div class="table-responsive card">
                <table class="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Codigo</th>
                            <th>Nombre del Producto</th>
                            <th>Descripción</th>
                            <th>Imagen</th>
                            <th>Vendedor</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in productos" :key="item.id">
                            <td>{{ item.id }}</td>
                            <td>{{ item.codigo }}</td>
                            <td>{{ item.nombre_producto }}</td>
                            <td>{{ item.descripcion }}</td>
                            <td>
                                <img :src="item.imagen" alt="imagen" width="150" height="120" />
                            </td>
                            <td>{{ item.vendedor_id }}</td>
                            <td>
                                <span v-if="item.estado" class="badge text-bg-success">Activo</span>
                                <span v-else class="badge text-bg-danger">Inactivo</span>
                            </td>
                            <td>
                                <button @click="seleccionar(item)" class="btn btn-warning btn-sm">
                                    <i class="fa fa-edit"></i>
                                </button>
                                <button v-if="item.estado" @click="estado(item.id)" class="btn btn-danger btn-sm">
                                    <i class="fa fa-ban"></i>
                                </button>
                                <button v-else @click="estado(item.id)" class="btn btn-primary btn-sm">
                                    <i class="fa fa-check"></i>
                                </button>
                                <button v-if="item.estado === 0" @click="eliminar(item.id)"
                                    class="btn btn-danger btn-sm">
                                    <i class="fa fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>                        
        </div>
        <br><hr><br>
        <div class="container d-flex justify-content-between align-items-center p-3">
            <h4 class="text-left">Listado de Pedidos</h4>
            <!-- <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalProducto">
                <i class="fa fa-plus"></i>
                Nuevo Pedido
            </button> -->
        </div>
        <div class="container">
            <div class="table-responsive card">
                <table class="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Producto</th>
                            <th>Cliente</th>
                            <th>Vendedor</th>
                            <th>Comentario</th>
                            <th>Estado</th>
                            <th>Fecha Pedido</th>
                            <th>Fecha Entrega</th>
                            <th>Coordenadas</th>
                            <th>Dirección</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="pedido in pedidos" :key="pedido.id">
                            <td>{{ pedido.id }}</td>
                            <td>{{ pedido.producto_id }}</td>
                            <td>{{ pedido.cliente_id }}</td>
                            <td>{{ pedido.vendedor_id }}</td>
                            <td>{{ pedido.comentario }}</td>
                            <td>{{ pedido.estado }}
                                <select name="estado" @change="cambiarEstadoPedido(pedido.id, $event.target.value)" id="">
                                    <option value="Pendiente" >Pendiente</option>
                                    <option value="En camino">En camino</option>
                                    <option value="Entregado">Entregado</option>
                                </select>
                            </td>
                            <td>{{ pedido.fecha_pedido}}</td>
                            <td>{{ pedido.fecha_entrega}}</td>
                            <td>{{ pedido.coordenadas}}</td>
                            <td>{{ pedido.direccion}}</td>
                            
                            <td>
                                <button @click="seleccionar(item)" class="btn btn-warning btn-sm">
                                    <i class="fa fa-edit"></i>
                                </button>                                
                                <!-- <button  class="btn btn-primary btn-sm">
                                    <i class="fa fa-check"></i>
                                </button> -->
                                <button @click="eliminar(item.id)"
                                    class="btn btn-danger btn-sm">
                                    <i class="fa fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>                        
        </div>
        <br><hr><br>
        <div class="container d-flex justify-content-between align-items-center p-3">
            <h4 class="text-left">Listado de Usuarios</h4>
            <button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalProducto">
                <i class="fa fa-plus"></i>
                Nuevo Usuario
            </button> 
        </div>
        <div class="container">
            <div class="table-responsive card">
                <table class="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Nombre</th>
                            <th>Correo</th>
                            <th>Telefono</th>
                            <th>Usuario</th>
                            <th>Rol</th>
                            <th>Estado</th>
                           
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="usuario in usuarios" :key="usuario.id">
                            <td>{{ usuario.id }}</td>
                            <td>{{ usuario.nombre }}</td>
                            <td>{{ usuario.correo }}</td>
                            <td>{{ usuario.telefono }}</td>
                            <td>{{ usuario.usuario }}</td>
                            <td>{{ usuario.rol }}</td>
                            <td>{{ usuario.estado }}</td>
                            <!-- <button v-if="usuario.estado === 0" @click="eliminar(usuario.id)"
                                    class="btn btn-danger btn-sm">
                                    <i class="fa fa-trash"></i>
                            </button> -->
                            
                            <td>
                                <button @click="seleccionar(usuario)" class="btn btn-warning btn-sm">
                                    <i class="fa fa-edit"></i>
                                </button>                                
                                <!-- <button  class="btn btn-primary btn-sm">
                                    <i class="fa fa-check"></i>
                                </button> -->
                                <button @click="eliminar(usuario.id)"
                                    class="btn btn-danger btn-sm">
                                    <i class="fa fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>                        
        </div>
        <br><br>

        <!-- Modal Nuevo Pedido -->
        <div class="modal fade" id="modalProducto" tabindex="-1" aria-labelledby="modalProductoLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="modalProductoLabel">Nuevo Pedido</h5>
                        <button type="button" @click="reset()" class="btn-close" data-bs-dismiss="modal"
                            aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form @submit.prevent="agregarPedido">
                            <div class="mb-3">
                                <label for="codigo" class="form-label">Código</label>
                                <input type="text" class="form-control" id="producto" v-model="codigo" required />
                            </div>
                            <div class="mb-3">
                                <label for="nombre_producto" class="form-label">Nombre del Producto</label>
                                <input type="text" class="form-control" id="nombre_producto" v-model="nombre_producto"
                                    required />
                            </div>
                            <div class="mb-3">
                                <label for="descripcion" class="form-label">Descripcion</label>
                                <input type="text" class="form-control" id="descripcion" v-model="descripcion"
                                    required />
                            </div>
                            <div class="mb-3">
                                <label for="imagen" class="form-label">Imagen</label>
                                <input type="text" class="form-control" id="imagen" v-model="imagen" required />
                            </div>
                            <div class="mb-3">
                                <label for="estado_pedido" class="form-label">Estado</label>
                                <input type="numbert" class="form-control" id="estado_pedido" v-model="estado_pedido" required />
                            </div>
                            <div class="mb-3">
                                <label for="vendedor_id" class="form-label">Vendedor</label>
                                <input type="numbert" class="form-control" id="vendedor_id" v-model="vendedor_id" required />
                                <!-- <select v-model="vendedor_id" class="form-select">
                                   
                                    <option v-for="prod in productos" :key="prod.id"
                                        :value="prod.rol"> {{
                                        prod.rol }}
                                    </option>
                                </select> -->
                            </div>

                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" @click="reset()"
                                    data-bs-dismiss="modal">Cancelar</button>
                                <button type="button" @click="registrarProducto()" class="btn btn-primary">Guardar
                                    Producto</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>


</template>
<script setup>

import { ref, onMounted } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useRouter } from 'vue-router';
const route = useRouter();

const productos = ref([]);
const pedidos = ref([]);
const usuarios = ref([]);
// const token = localStorage.getItem('token') || '';
// const header = {
//     headers: {
//         'Authorization': `Bearer ${token}`,
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//     }
// }
let baseURL = 'http://localhost:3000/'

const codigo = ref('');
const nombre_producto = ref('');
const descripcion = ref('');
const imagen = ref('');
const estado = ref(1);
const vendedor_id = ref('1');
//const nuevoPedido = ref({});
const seleccionado = ref({});


onMounted(() => {
    // if (token == '' || token == null) {
    //     expirado();
    // }
    obtenerProductos();
    obtenerPedidos();
    obtenerUsuarios()
});

const obtenerProductos = async () => {
    try {
        const { data } = await axios.get(baseURL + 'productos');
        console.log(data);
        productos.value = data.data;
    } catch (error) {
        console.log(error);
        // if (error.response.status == 403 || error.response.status == 401) {
        //     expirado();
        // }
    }
}
const registrarProducto = async () => {

    if (codigo.value == '' || nombre_producto.value == '' || descripcion.value == '' || estado.value == '' || vendedor_id.value == '') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Todos los campos son obligatorios',
        })
        return;
    }
    const datos = {
        codigo: codigo.value,
        nombre_producto: nombre_producto.value,
        descripcion: descripcion.value,
        imagen: imagen.value,
        estado: estado.value,
        vendedor_id: vendedor_id.value
    }
    try {
        const { data } = await axios.post(baseURL + 'productos/store', datos);
        console.log(data);
        obtenerProductos();

        var myModalEl = document.getElementById('modalProducto');
        var modal = bootstrap.Modal.getInstance(myModalEl)
        modal.hide();
    } catch (error) {
        console.log(error);
        // if (error.response.status == 403 || error.response.status == 401) {
        //     expirado();
        // }
    }
}

const eliminar = async (id) => {
    try {
        const { data } = await axios.delete(baseURL + 'productos/delete/' + id);
        obtenerProductos();
    } catch (error) {
        console.log(error);
        // if (error.response.status == 403 || error.response.status == 401) {
        //     expirado();
        // }
    }
}

const obtenerPedidos = async () => {
    try {
        const { data } = await axios.get(baseURL + 'pedidos');
        console.log(data);
        pedidos.value = data.data;
    } catch (error) {
        console.log(error);
        // if (error.response.status == 403 || error.response.status == 401) {
        //     expirado();
        // }
    }
}
const cambiarEstadoPedido = async (id, estado) => {
    try {
        const { data } = await axios.put(baseURL + 'pedidos/estado/' + id, { estado: estado });
        obtenerDatos();
    } catch (error) {
        console.log(error);
        // if (error.response.status == 403 || error.response.status == 401) {
        //     expirado();
        // }
    }
}
const obtenerUsuarios = async () => {
    try {
        const { data } = await axios.get(baseURL + 'users');
        console.log(data);
        usuarios.value = data.data;
    } catch (error) {
        console.log(error);
        // if (error.response.status == 403 || error.response.status == 401) {
        //     expirado();
        // }
    }
}
const reset = () => {
    codigo.value = '';
    nombre_producto.value = '';
    descripcion.value = '';
    imagen.value = '';
    estado.value = 1;
    vendedor_id.value = '';
}
</script>

<style scoped>
.table-responsive {
    max-height: 300px;
    /* Altura máxima del contenedor */
    overflow-y: auto;
    /* Scroll vertical */
}
</style>