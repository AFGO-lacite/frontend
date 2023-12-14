<template>
  <div class="mt-5 row">
    <div class="d-flex justify-content-center text-white display-1 "><p>Tableau de bord</p></div>

    <div class="mt-5 row container-fluid d-flex justify-content-center ">
      <div class="col-md-5">
        <div class="bg-warning p-5 m-3 d-flex justify-content-center rounded shadow-lg" @click="voiture">
          <div class="dis justify-content-center">
            <p class="h1">Gestion des voiture</p>
            <img
              src="../../icones/Voiture.png"
              alt="Voiture"
              class="img-fluid custom-img-size"
            />
          </div>
        </div>

        <div class="bg-warning p-5 m-3 d-flex justify-content-center rounded shadow-lg" @click="employe">
          <div class="dis justify-content-center">
            <p class="h1">Gestion des employés</p>
            <img
              src="../../icones/Employe.png"
              alt="Icône Employé"
              class="img-fluid custom-img-size"
            />
          </div>
        </div>
      </div>

      <div class="col-md-5">
        <div class="bg-warning p-5 m-3 d-flex justify-content-center rounded shadow-lg" @click="parking">
          <div class="dis justify-content-center">
            <p class="h1">Gestion des parkings</p>
            <img
              src="../../icones/Parking.png"
              alt="Icône Parking"
              class="img-fluid custom-img-size"
            />
          </div>
        </div>
        <div class="bg-warning p-5 m-3 d-flex justify-content-center rounded shadow-lg" @click="role">
          <div class="dis justify-content-center">
            <p class="h1">Gestion des roles</p>
            <img
              src="../../icones/Role.png"
              alt="Icône Rôle"
              class="img-fluid custom-img-size pd-1 mb-2"
            />
          </div>
        </div>
      </div>

      <div class="col-md-5">
        <div class="bg-warning p-5 m-3 d-flex justify-content-center rounded shadow-lg" @click="secursalle">
          <div class="dis justify-content-center">
            <p class="h1">Gestion des seccursalles</p>
            <img
              src="../../icones/Seccursalle.png"
              alt="Icône Séccursalle"
              class="img-fluid custom-img-size"
            />
          </div>
        </div>
        <div class="bg-warning p-5 m-3 d-flex justify-content-center rounded shadow-lg" @click="client">
          <div class="dis justify-content-center">
            <p class="h1">Gestion des clients</p>
            <img
              src="../../icones/Client.png"
              alt="Icône Client"
              class="img-fluid custom-img-size"
            />
          </div>
        </div>
      </div>

      <div class="col-md-5">
        <div class="bg-warning p-5 m-3 d-flex justify-content-center rounded shadow-lg" @click="reservation">
          <div class="dis justify-content-center">
            <p class="h1">Gestion des réservations</p>
            <img
              src="../../icones/Reservation.png"
              alt="Icône Réservation"
              class="img-fluid custom-img-size"
            />
          </div>
        </div>
        <div class="bg-warning p-5 m-3 d-flex justify-content-center rounded shadow-lg" @click="maintenance">
          <div class="dis justify-content-center">
            <p class="h1">Gestion des maintenances</p>
            <img
              src="../../icones/Maintenance.png"
              alt="Icône Maintenance"
              class="img-fluid custom-img-size"
            />
          </div>
        </div>
      </div>

      <div class="col-md-5">
        <div class="bg-warning p-5 m-3 d-flex justify-content-center rounded shadow-lg" @click="garage">
          <div class="dis justify-content-center">
            <p class="h1">Gestion des garages</p>
            <img
              src="../../icones/Garage.png"
              alt="Icône Garage"
              class="img-fluid custom-img-size"
            />
          </div>
        </div>
        <div class="bg-warning p-5 m-3 d-flex justify-content-center rounded shadow-lg">
          <div class="dis justify-content-center">
            <p class="h1">Gestion des livraisons</p>
            <img
              src="../../icones/Livraison.png"
              alt="Icône Livraison"
              class="img-fluid custom-img-size"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router=useRouter()
const employe=()=>{

    router.push('/ListeEmploye')

}

const role=()=>{
  router.push('/ListeRole')
}


const garage=()=>{
  router.push('/ListeGarage')
}

const parking=()=>{
  router.push('/ListeParking')
}

const secursalle=()=>{
  router.push('/ListeSecursalle')
}

const voiture=()=>{
  router.push('/ListeVoiture')
}

const maintenance=()=>{
  router.push('/ListeMaintenance')
}

const client=()=>{
  router.push('/ListeClient')
}

const reservation=()=>{
  router.push('/ListeReservation')
}
</script>






<style scoped>
.custom-img-size {
  max-width: 211px;
  max-height: 211px;
}
.LL {
  width: 100%;
}
.dis {
  display: inline-block;
  text-align: center;
}


/* Classe pour les divs à rendre hoverable */
.bg-warning.p-5.m-3.d-flex.justify-content-center.rounded.shadow-lg {
  transition: transform 0.3s ease, background-color 0.3s ease;
}

/* Effet de zoom et d'assombrissement au survol */
.bg-warning.p-5.m-3.d-flex.justify-content-center.rounded.shadow-lg:hover {
  transform: scale(1.05);
  background-color: rgba(0, 0, 0, 0.1);
}

</style>
