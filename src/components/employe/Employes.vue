<template >
  <tr class=" ">
    <td>{{ employe.id }}</td>
    <td>{{ employe.Nom }}</td>
    <td>{{ employe.Prenom }}</td>

  

    <td>
      <button class="btn btn-primary m-2" 
      
      @click="$emit('detail', employe)"
        data-bs-toggle="modal"
        data-bs-target="#Modal_detail">Détails</button>
      <button
        class="btn btn-warning  m-2"
        
        @click="$emit('editer', employe)"
        data-bs-toggle="modal"
        data-bs-target="#myModal"
      >
        Éditer
      </button>
      <button
        class="btn btn-danger  m-2"
       
        @click="gererSuppression(employe.id)"
      >
        Supprimer
      </button>
    </td>
  </tr>
</template>

<script setup>
import { computed } from "vue";
import { defineProps } from "vue";
import { useEmploye } from "../../service/server";
import { useRouter } from "vue-router";

const props = defineProps({
  employe: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["supprimer", "editer", "detail"]);
const photoURL = computed(() => {
  return props.employe.Photo
    ? `data:image/jpeg;base64,${btoa(
        String.fromCharCode(...new Uint8Array(props.employe.Photo))
      )}`
    : "";
});


const gererSuppression = (id) => {
  emit("supprimer", props.employe.id);
};


</script>

<style scoped>
.employee-photo {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
}
</style>
