<template>
    <tr class=" ">
      <td>{{ garage.id }}</td>
      <td>{{ garage.nomDuGarage }}</td>
      <td>{{ garage.adresse }}</td>
  
      <td>
       
        <button
          class="btn btn-warning m-2"
          @click="$emit('editer_garage', garage)"
          data-bs-toggle="modal"
          data-bs-target="#modification_garage"
        >
          Éditer
        </button>
        <button
          class="btn btn-danger m-2"
          @click="$emit('supprimer_garage', garage.id)"
        >
          Supprimer
        </button>
      </td>
    </tr>
  </template>
  
  <script setup>
  import { defineProps } from "vue";
  const emit = defineEmits(["supprimer_garage", "editer_garage", "ajouter_garage"]);
  
  const props = defineProps({
    garage: {
      type: Object,
      required: true,
    },
  });
  </script>
  
  <style scoped>
  /* Styles spécifiques au composant frontend */
  </style>
  