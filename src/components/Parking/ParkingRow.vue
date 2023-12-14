<template>
    <tr class=" ">
      <td>{{ parking.couleurDuParking }}</td>
      <td>{{ parking.SecurSalle ? parking.SecurSalle.adresseDeLaSecurSalle : '-' }}</td>
  
      <td>
      
        <button
          class="btn btn-warning m-2"
          @click="$emit('editer_parking', parking)"
          data-bs-toggle="modal"
          data-bs-target="#modification_parking"
        >
          Éditer
        </button>
        <button
          class="btn btn-danger m-2"
          @click="$emit('supprimer_parking', parking.couleurDuParking)"
        >
          Supprimer
        </button>
      </td>
    </tr>
  </template>
  
  <script setup>
  import { defineProps } from "vue";
  const emit = defineEmits(["supprimer_parking", "editer_parking", "ajouter_parkings"]);
  
  const props = defineProps({
    parking: {
      type: Object,
      required: true,
    },
  });


  console.log(props.parking);
  </script>
  
  <style scoped></style>
  