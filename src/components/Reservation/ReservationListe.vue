<template>
    <h1 class="h1 d-flex justify-content-center text-white mt-4">
      Liste des reservation
    </h1>
    
   

    <table class="table table-hover  table-dark">
      <thead>
        <tr>
          <th>ID</th>
          <th>Date de debut</th>
          <th>Date de fin</th>
          <th>Cout</th>
          <th>Livraison</th>
          <th>Voiture</th>
          <th>Client</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <ReservationRow
          v-for="reservation in reservations.data"
          :key="reservation.id"
          :reservation="reservation"
          
          @supprimer_reservation="supprimer_reservation"
        />
      </tbody>
    </table>
  
  </template>
  
  <script setup>
  import ReservationRow from './ReservationRow.vue';
  import { ref, onBeforeMount, reactive } from 'vue';
  import { useReservation } from '../../service/server';
  
  const {  listeReservations, ajoutReservation, modifierReservation, reservationParId, supprimerReservation } = useReservation();
  
  const reservations = ref([]);


  
  onBeforeMount(() => {
    listeReservations().then((data) => {
      reservations.value = data;
    });
  });
  
  
  const supprimer_reservation = (id) => {
    try {
      supprimerReservation(id).then(() => {
        listeReservations().then((data) => {
          reservations.value = data;
        });
      });
    } catch (errors) {
      console.log(errors);
    }
  };
  </script>
  
<style scoped>

</style>