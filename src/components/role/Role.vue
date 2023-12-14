<template>
    <tr class=" ">
    <td>{{ role.id }}</td>
    <td>{{ role.Nom_Du_Role }}</td>
    

    <td>
       
      <button
        class="btn btn-warning  m-2"
        
        @click="$emit('editer_role', role)"
        data-bs-toggle="modal"
        data-bs-target="#modification_role"
      >
        Éditer
      </button>
      <button
        class="btn btn-danger  m-2"
       
        @click="$emit('supprimer_role',role.id)"
      >
        Supprimer
      </button>
    </td>
  </tr>
</template>

<script setup>
   import { defineProps } from "vue";
    const emit = defineEmits(["supprimer_role", "editer_role","ajouter_role"]);
   
  
   const props = defineProps({
  role: {
    type: Object,
    required: true,
  },
}); 




</script>

<style lang="scss" scoped>

</style>