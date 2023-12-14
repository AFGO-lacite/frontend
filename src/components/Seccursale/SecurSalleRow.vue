<template>
    <tr class=" ">
      <td>{{ securSalle.id }}</td>
      <td>{{ securSalle.adresseDeLaSecurSalle }}</td>
      
      <td>
       
        <button
          class="btn btn-warning m-2"
          @click="$emit('editer_securSalle', securSalle)"
          data-bs-toggle="modal"
          data-bs-target="#modification_securSalle"
        >
          Éditer
        </button>
        <button
          class="btn btn-danger m-2"
          @click="$emit('supprimer_securSalles', securSalle.id)"
        >
          Supprimer
        </button>
      </td>
    </tr>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  const props = defineProps({
    securSalle: {
      type: Object,
      required: true,
    },
  });
  </script>
  
  <style scoped>
  /* Vos styles CSS ici */
  </style>
  