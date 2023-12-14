<template>
    <tr class=" ">
      <td>{{ client.id }}</td>
      <td>{{ client.nom }}</td>
      <td>{{ client.prenom }}</td>
      <td>{{ client.dateDeNaissance }}</td>
      <td>{{ client.email }}</td>
      <td>{{ client.telephone}}</td>
      <td>{{ client.adressePostale }}</td>
      <td>{{ client.numeroDePermis }}</td>
  
      <td>
       
       
        <button
          class="btn btn-danger m-2"
          @click="$emit('supprimer_client', client.id)"
        >
          Supprimer
        </button>
      </td>
    </tr>
  </template>
  
  <script setup>
  import { defineProps } from "vue";
  const emit = defineEmits(["supprimer_client"]);
  
  const props = defineProps({
    client: {
      type: Object,
      required: true,
    },
  });
  </script>
  
  <style scoped>
  /* Styles spécifiques au composant frontend */
  </style>
