<template>
    <h1 class="h1 d-flex justify-content-center text-white mt-4">
      Liste des client
    </h1>
    
   

    <table class="table table-hover  table-dark">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nom</th>
          <th>Prénom</th>
          <th>Date de naissance</th>
          <th>Émail</th>
          <th>Téléphone</th>
          <th>Adresse</th>
          <th>Numéro de permis</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <ClientRow
          v-for="client in clients"
          :key="client.id"
          :client="client"
          
          @supprimer_client="supprimer_client"
        />
      </tbody>
    </table>
  
  </template>
  
  <script setup>
  import ClientRow from './ClientRow.vue';
  import { ref, onBeforeMount, reactive } from 'vue';
  import { useClient } from '../../service/server';
  
  const {  listerClients, ajouterClient, modifierClient, recupererClient, supprimerClient } = useClient();
  
  const clients = ref([]);


  
  onBeforeMount(() => {
    listerClients().then((data) => {
      clients.value = data;
    });
  });
  
  
  const supprimer_client = (id) => {
    try {
      supprimerClient(id).then(() => {
        listerClients().then((data) => {
          clients.value = data;
        });
      });
    } catch (errors) {
      console.log(errors);
    }
  };
  </script>
  
<style scoped>

</style>