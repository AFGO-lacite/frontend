<template>
    <h1 class="h1 d-flex justify-content-center text-white mt-4">
      Liste des reservation
    </h1>
    <div  class="d-flex justify-content-end">
    <button
        class="btn btn-dark  m-2"
        
        @click="ajouter_reservation"
        
      >
        Ajouter
      </button> 

  </div>
   

    <table class="table table-hover  table-dark">
      <thead>
        <tr>
          <th>ID</th>
          <th>Date de debut</th>
          <th>Date de fin</th>
          <th>Cout</th>
          <th>Livraison</th>
          <th>Voiture</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <ReservationRow
          v-for="reservation in reservations.data"
          :key="reservation.id"
          :reservation="reservation"
          @editer_reservation="editer_reservation"
          @suprimer_reservation="suprimer_reservation"
        />
      </tbody>
    </table>
  

    
  

  </template>
  
  <script setup>
  import ReservationRow from './ReservationClientRow.vue';
  import { ref, onBeforeMount, reactive, computed } from 'vue';
  import { useReservation } from '../../service/server';
  import useAuthStore from '../../stores/auth';
  import { watchEffect } from 'vue';
  import { useRouter } from "vue-router";
const router = useRouter();
  const {  listeReservations, ajoutReservation, modifierReservation, reservationParId, supprimerReservation,listereservationsParClientId } = useReservation();
  const{loggedInUser}=useAuthStore()

  const reservations = ref([]);

 
  
  onBeforeMount(() => {
    
    
    listereservationsParClientId(10).then((data) => {
      reservations.value = data;
    });
  });
  
  
  const suprimer_reservation = (id) => {
    try {
      supprimerReservation(id).then(() => {
        listereservationsParClientId(10).then((data) => {
          reservations.value = data;
        });
      });
    } catch (errors) {
      console.log(errors);
    }
  };

  const ajouter_reservation = ()=>{
    router.push('/ajouter')

  }
  </script>
  
<style scoped>

</style>