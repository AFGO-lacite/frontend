<template>
    <tr>
      <td>{{ mavoiture.id }}</td>
      <td>{{ mavoiture.Marque }}</td>
      <td>{{ mavoiture.Modele }}</td>
      <td>{{ mavoiture.Type_de_voiture }}</td>
      <td>{{ mavoiture.Annee_de_fabrication }}</td>
      <td>{{ mavoiture.Disponibilite ? 'Disponible' : 'Indisponible' }}</td>
      <td>{{ mavoiture.Prix_par_jour }}</td>
      
      <td>
        <button class="btn btn-warning m-2" @click="editerLaVoiture">Éditer</button>
      <button class="btn btn-danger m-2" @click="supprimerLaVoiture">Supprimer</button>
    
      </td>
    </tr>
  </template>
  
  <script setup>
  import { defineProps, defineEmits } from "vue";
  
  const emit = defineEmits(["supprimer-voitures", "editer-voituress"]);
  const props = defineProps({
    mavoiture: {
      type: Object,
      
    },
  });

  const editerLaVoiture = () => {
  emit("editer-voituress", props.mavoiture);
};

const supprimerLaVoiture = () => {
  emit("supprimer-voitures", props.mavoiture.id);
};
  
  
 
  </script>
  
  <style scoped></style>
  