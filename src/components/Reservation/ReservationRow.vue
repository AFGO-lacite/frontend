<template>
    <tr class=" ">
      <td>{{ reservation.id }}</td>
      <td>{{ reservation.Date_de_debut_de_la_reservation }}</td>
      <td>{{ reservation.Date_de_fin_de_la_reservation }}</td>
      <td>{{ reservation.Cout}}</td>
      <td>{{ reservation.Livraison }}</td>
      <td v-if="voiture && voiture.data">{{ voiture.data.Marque }} - {{ voiture.data.Modele }}</td>
      <td v-if="client">{{ client.prenom }} - {{ client.nom }}</td>
      
  
      <td>
       
       
        <button
          class="btn btn-danger m-2"
          @click="$emit('supprimer_reservation', reservation.id)"
        >
          Supprimer
        </button>
      </td>
    </tr>
  </template>
  
  <script setup>
  import { defineProps, defineEmits, ref, watchEffect } from 'vue';
  import { useVoiture, useClient } from '../../service/server';
  const emit = defineEmits(["supprimer_reservation"]);
  const { voitureParId } = useVoiture();
  const {recupererClient}=useClient()
  const props = defineProps({
    reservation: {
      type: Object,
      required: true,
    },
  });


  const client = ref(null);
  const voiture = ref(null);
  
  watchEffect(async () => {
    if (props.reservation.VoitureId) {
      voiture.value = await voitureParId(props.reservation.VoitureId);
    }
  });

  watchEffect(async () => {
    if (props.reservation.ClientId) {
      client.value = await recupererClient(props.reservation.ClientId);
    }
  });

  </script>
  
  <style scoped>
  /* Styles spécifiques au composant frontend */
  </style>
  