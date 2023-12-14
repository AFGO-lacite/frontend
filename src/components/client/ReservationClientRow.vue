<template>
    <tr class=" ">
      <td>{{ reservation.id }}</td>
      <td>{{ reservation.Date_de_debut_de_la_reservation }}</td>
      <td>{{ reservation.Date_de_fin_de_la_reservation }}</td>
      <td>{{ reservation.Cout}}</td>
      <td>{{ reservation.Livraison }}</td>
      <td v-if="voiture && voiture.data">{{ voiture.data.Marque }} - {{ voiture.data.Modele }}</td>
      
      
  
      <td>
       
        <button
          class="btn btn-warning m-2"
          @click="$emit('editer_reservation', reservation.id)"
        >
          Editer
        </button>
        <button
          class="btn btn-danger m-2"
          @click="$emit('suprimer_reservation', reservation.id)"
        >
          Supprimer
        </button>
      </td>
    </tr>
  </template>
  
  <script setup>
  import { defineProps, defineEmits, ref, watchEffect, onBeforeMount } from 'vue';
  import { useVoiture } from '../../service/server';

  const emit = defineEmits(["suprimer_reservation","editer_reservation"]);
  const { voitureParId } = useVoiture();
 
  const props = defineProps({
    reservation: {
      type: Object,
      required: true,
    },
  });

onBeforeMount(()=>{
    console.log(props.reservation.VoitureId)
    
})

  const voiture = ref(null);
  
  watchEffect(async () => {
    if (props.reservation.VoitureId) {
      voiture.value = await voitureParId(props.reservation.VoitureId);
    }
  });

 

  </script>
  
  <style scoped>
  /* Styles spécifiques au composant frontend */
  </style>
  