<template>
    <tr>
      <td>{{ maintenance.id }}</td>
      <td>{{ maintenance.TypeDeMaintenance }}</td>
      <td>{{ maintenance.DateDeDebut }}</td>
      <td>{{ maintenance.DateDeFin }}</td>
      <td v-if="voiture && voiture.data">{{ voiture.data.Marque }} - {{ voiture.data.Modele }}</td>
      <td v-else>Chargement voiture...</td>
      <td v-if="garage && garage.nomDuGarage">{{ garage.nomDuGarage }}</td>
      <td v-else>Chargement garage...</td>
      <td>
        <button class="btn btn-warning m-2" @click="editer" data-bs-toggle="modal"
        data-bs-target="#modifier_maintenance_modal">Éditer</button>
        <button class="btn btn-danger m-2" @click="supprimer">Supprimer</button>
      </td>
    </tr>
  </template>
  
  <script setup>
  import { defineProps, defineEmits, ref, watchEffect } from 'vue';
  import { useVoiture, useGarageDeMaintenance } from '../../service/server';
  
  const { voitureParId } = useVoiture();
  const { recupererGarage } = useGarageDeMaintenance();
  const props = defineProps({
    maintenance: {
      type: Object,
      required: true,
    },
  });
  
  const garage = ref(null);
  const voiture = ref(null);
  
  watchEffect(async () => {
    if (props.maintenance.VoitureId) {
      voiture.value = await voitureParId(props.maintenance.VoitureId);
    }
  });
  
  watchEffect(async () => {
    if (props.maintenance.GarageDeMaintenanceId) {
      garage.value = await recupererGarage(props.maintenance.GarageDeMaintenanceId);
    }
  });
  
  const emit = defineEmits(['editerMaintenance', 'supprimerMaintenance']);
  
  const editer = () => {
    emit('editerMaintenance', props.maintenance);
  };
  
  const supprimer = () => {
    emit('supprimerMaintenance', props.maintenance.id);
  };
  </script>
  
  <style scoped>
  /* CSS personnalisé ici */
  </style>
  