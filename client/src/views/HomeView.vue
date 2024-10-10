<template>
  <div>
    <header class="header">
      <div class="d-flex justify-content-end align-items-center px-4">
        <RouterLink class="text-white text-decoration-none text-identif" to="/login">Identificarse</RouterLink>
        <!-- <RouterLink style="display: none" to="/" id="logout-btn">
          Cerrar sesión
        </RouterLink> -->
        <!-- <button id="logout-btn" class="btn btn-outline-danger me-2" style="display: none;">Cerrar Sesión</button> -->
      </div>
      <h1>🍾 Licorería Express 🍾</h1>
      <br>
      <br>
    </header>
    <div class="container">
      <div class="d-flex justify-content-between p-3">
        <!-- |<span class="input-group-text"  id="basic-addon1"><i class="fa fa-search"></i></span> -->
        <div class="input-group mb-3" style="width: 500px;">
          <input type="text" class="form-control" v-model="buscarProd" placeholder="Buscar..." id="buscador">
          <button class="btn btn-primary" @click="buscarProductos()" type="button" id="buscarBtn">Buscar</button>
        </div>
        <div class="position-relative d-inline-block">
          <span class="badge bg-carrito fs-5" data-bs-toggle="modal" data-bs-target="#modalCarrito"
            role="button">Carrito/
            <i id="cart-icon" class="fa fa-shopping-cart"></i></span>
          <span class="bg-danger" id="cart-count">{{ (carrito.id) ? 1 : 0 }}</span>
        </div>
      </div>
      <div class="select-container text-center">
        <h2 class="text-center">Nuestros Productos:</h2>
        <br>
        <h5>Selecciona un categoría</h5>
        <select v-model="prodcat" class="form-select" @change="obtenerProductos()">
          <option value="">Todos</option>
          <option v-for="prodcat in categorias" :key="prodcat.id" :value="prodcat.nombre_producto"> {{
            prodcat.nombre_producto }}
          </option>
        </select>
      </div>
      <div class="row">
        <div class="row row-cols-1 row-cols-md-3 g-4">
          <div v-for="producto in productos" :key="producto.id" class="col">
            <div class="card h-100">
              <img :src="producto.imagen" class="card-img-top" alt="Img">
              <div class="card-body">
                <h5 class="card-title">{{ producto.nombre_producto }}</h5>
                <p class="card-text">{{ producto.descripcion }}</p>
                <button class="btn btn-primary" @click="agregarAlCarrito(producto)">Añadir al carrito</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


    <!-- Modal Body -->

    <div class="modal fade" id="modalCarrito" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false"
      role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
      <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modalTitleId">
              Tu carrito
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
            <div class="modal-body">
              <div class="card mb-3" style="max-width: 540px;">
                <div class="row g-0">
                  <div class="col-md-4">
                    <img :src="carrito.imagen" class="img-fluid rounded-start" alt="Img">
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">{{ carrito.nombre_producto }}</h5>
                      <p class="card-text">{{ carrito.descripcion }}</p>
                    </div>
                  </div>
                </div>
              </div>
              <hr>
              <p><b>Llenar campos para hacer el pedido</b></p>
              <div class="mb-3">
                <label for="comentario" class="form-label">Comentario</label>
                <input type="text" class="form-control" id="comentario" v-model="comentario" placeholder="Opcional...">
              </div>
              <div class="mb-3">
                <label for="direccion" class="form-label">Dirección</label>
                <input type="text" class="form-control" id="direccion" v-model="direccion">
              </div>
              <div class="mb-3">
                <label for="coordenadas" class="form-label">Coordenadas</label>
                <input type="text" class="form-control" id="coordenadas" v-model="coordenadas">
              </div>
              <GoogleMap api-key="AIzaSyAtDY3jTFm21OrFaSXjebotMNLKaEkGd3g" style="width: 100%; height: 350px"
                          :center="center"
                          :zoom="15">
                    <Marker
                      :options="{ position: center, draggable: true }"
                      @dragend="obtenerNuevo($event)"
                      ref="markerRef"
                     />
                </GoogleMap>
            </div>  

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
            Close
          </button>
          <button type="button" @click="guardarPedido()" class="btn btn-primary">Registrar Pedido</button>
        </div>
      </div>
    </div>
  </div>
  <footer class="footer">
    <p>© 2024 Pedidos Express. Todos los derechos reservados.</p>
  </footer>

  </div>
</template>
<script setup>

import { ref, onMounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { GoogleMap, Marker } from 'vue3-google-map'
import { useRouter } from "vue-router";
const route = useRouter();

const categorias = ref([]);
const productos = ref([]);
const carritos = ref([]);
const producto = ref();
const prodcat = ref();

const buscarProd = ref('');
const coordenadas = ref('');
const direccion = ref('');
const comentario = ref('');
const carrito = ref({});


const center = ref({ lat: 0, lng: 0 });


let baseURL = 'http://localhost:3000/';

onMounted(() => {
  obtenerCatProductos();
  obtenerProductos();
  miUbicacion();
})
const obtenerCatProductos = async () => {
  try {
    const { data } = await axios.get(baseURL + 'categorias');

    console.log(data);

    categorias.value = data.data;
  } catch (error) {
    console.log(error);
  }
};
const obtenerProductos = async () => {
  try {
    let url = baseURL + 'productos';
    if (prodcat.value) {
      url += '/' + prodcat.value;
    }
    const { data } = await axios.get(url);

    console.log(prodcat.value);

    productos.value = data.data;
  } catch (error) {
    console.log(error);
  }
};

const buscarProductos = async () => {
  try {
    let url = baseURL + 'productos';
    if (buscarProd.value) {
      url += '/' + buscarProd.value;
    }
    const { data } = await axios.get(url);

    console.log(buscarProd.value);
    productos.value = data.data;
  } catch (error) {
    console.log(error);
  }

}
function agregarAlCarrito(productoId) {
  console.log(productoId);
  carrito.value = productoId;
}

const guardarPedido = async () => {
  
  const datos = {

    producto_id: carrito.value.id,
    cliente_id: null,
    vendedor_id: carrito.value.vendedor_id,
    comentario: comentario.value,
    estado: 'Pendiente',
    coordenadas: coordenadas.value,
    direccion: direccion.value
  }
  try {
    const { data } = await axios.post(baseURL + 'pedidos/store', datos);
    console.log(data);
    obtenerProductos();

    var myModalEl = document.getElementById('modalCarrito');
    var modal = bootstrap.Modal.getInstance(myModalEl)
    modal.hide();

  } catch (error) {
    console.log(error);
    
  }
}

const miUbicacion = () => {
    navigator.geolocation.getCurrentPosition((position) => {
        center.value = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        }
        coordenadas.value = center.value.lat + ',' +center.value.lng;
    })
}
 
const obtenerNuevo = (param) => {
    // console.log(param);
    coordenadas.value = {
        lat: param.latLng.lat(),
        lng: param.latLng.lng()
    }
 
    console.log(coordenadas.value.lat + ',' +coordenadas.value.lng);
 
    coordenadas.value = coordenadas.value.lat + ',' +coordenadas.value.lng;
 
    console.log(coordenadas.value);
}

</script>
