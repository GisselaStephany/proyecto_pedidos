<template>
    <div class="d-flex justify-content-center">
        <div class="card">
            <div class="card_body">
                <h3 class="text-center">Iniciar Sesión</h3>
                
                <div class="mb-3">
                    <label for="correo" class="form-label">Correo</label>
                    <input type="email" v-model="correo" class="form-control" id="correo" aria-describedby="emailHelp">
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Contraseña</label>
                    <input type="password" v-model="password" class="form-control" id="password">
                </div>
                <div class="mb-3 text-center">
                    <button @click="ingresar()" class="btn btn-primary">Iniciar</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>

import { ref, onMounted } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router';
const route = useRouter();


const correo = ref('');
const password = ref('');
let baseURL = 'http://localhost:3000/auth';

onMounted(() => {
    limpiarSesion();
});

const ingresar = async () => {
    if (correo.value == '' || password.value == '') {
        alert('Ingrese sus credenciales!');
        return;
    }
    var datos = {
            correo: correo.value,
            password: password.value
        }
    try {
        const { data } = await axios.post(baseURL + '/login', datos);
        console.log(data);

        localStorage.setItem('token', data.token);
        localStorage.setItem('usuario', JSON.stringify(data.usuario));
        Swal.fire({
            title: 'Hola ' + data.usuario.nombre + '!!',
            text: 'Te damos la bienvenida!',
            icon: 'success',
            showConfirmButton: false,
            timer: 1000
        });
        setTimeout(() => {
            route.push({path: '/'});
        },2000);

    } catch (error) {
        console.log(error);
        console.log(error.response.data);
        Swal.fire({
            title: 'Error!',
            text: 'Ingrese sus credenciales!',
            icon: 'error',
        });
    }
}

const limpiarSesion = () => {
    localStorage.clear();
}

</script>
<style scoped>
.card {
    width: 30rem;
    padding: 2rem;
    margin-top: 10%;
}
</style>