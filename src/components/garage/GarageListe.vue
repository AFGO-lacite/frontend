<template>
    <h1 class="h1 d-flex justify-content-center text-white mt-4">
      Liste des garages
    </h1>
    
    <div class="d-flex justify-content-end">
        <button
          class="btn btn-dark m-2"
          @click="$emit('ajouter_garage')"
          data-bs-toggle="modal"
          data-bs-target="#ajouter_garage_modal"
        >
          Ajouter
        </button>
    </div>

    <table class="table table-hover  table-dark">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nom du garage</th>
          <th>Adresse</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <GarageRow
          v-for="garage in garages"
          :key="garage.id"
          :garage="garage"
          @editer_garage="editer_garage"
          @supprimer_garage="supprimer_garage"
        />
      </tbody>
    </table>
  
    <!-- Modal de modification -->
    <div class="modal" id="modification_garage" data-bs-theme="dark">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title text-warning">Modifier les informations du garage</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
  
          <!-- Modal body -->
          <div class="modal-body">
            <form @submit.prevent="miseAJourGarage">
              <div class="form-group">
                <label for="NomDuGarage" class="text-warning">Nom du garage:</label>
                <input
                  type="text"
                  class="form-control"
                  id="NomDuGarage"
                  v-model="garageEnCoursEdition.nomDuGarage"
                  required
                />
              </div>
              <div class="form-group">
                <label for="Adresse" class="text-warning">Adresse:</label>
                <input
                  type="text"
                  class="form-control"
                  id="Adresse"
                  v-model="garageEnCoursEdition.adresse"
                  required
                />
              </div>
  
              <div class="form-group mt-3">
                <button
                  type="submit"
                  class="btn btn-warning"
                  @click="gererEdition"
                >
                  Mettre à jour
                </button>
              </div>
            </form>
          </div>
  
          <!-- Modal footer -->
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-danger mt-3"
              data-bs-dismiss="modal"
              @click="fermerModal"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  
    <!-- Modal d'ajout -->
    <div class="modal" id="ajouter_garage_modal" data-bs-theme="dark">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title text-warning">Ajouter un garage</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
  
          <!-- Modal body -->
          <div class="modal-body">
            <form @submit.prevent="AjoutGarage">
              <div class="form-group">
                <label for="NomDuGarage" class="text-warning">Nom du garage:</label>
                <input
                  type="text"
                  class="form-control"
                  id="NomDuGarage"
                  v-model="newGarage.nomDuGarage"
                  required
                />
              </div>
              <div class="form-group">
                <label for="Adresse" class="text-warning">Adresse:</label>
                <input
                  type="text"
                  class="form-control"
                  id="Adresse"
                  v-model="newGarage.adresse"
                  required
                />
              </div>
  
              <div class="form-group mt-3">
                <button
                  type="submit"
                  class="btn btn-warning"
                >
                  Ajouter
                </button>
              </div>
            </form>
          </div>
  
          <!-- Modal footer -->
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-danger mt-3"
              data-bs-dismiss="modal"
              @click="fermerModal"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import GarageRow from './Garage.vue';
  import { ref, onBeforeMount, reactive } from 'vue';
  import { useGarageDeMaintenance } from '../../service/server';
  
  const { listerGarages, ajouterGarage, supprimerGarage, modifierGarage } = useGarageDeMaintenance();
  
  const garages = ref([]);
  const newGarage = reactive({
    nomDuGarage: '',
    adresse: '',
  });
  
  const garageEnCoursEdition = ref({});
  
  onBeforeMount(() => {
    listerGarages().then((data) => {
      garages.value = data;
    });
  });
  
  const afficherModal = ref(false);
  
  const editer_garage = (garage) => {
    garageEnCoursEdition.value = { ...garage };
    afficherModal.value = true;
  };
  
  const miseAJourGarage = () => {
    console.log(garageEnCoursEdition.value.id)
   
    modifierGarage(garageEnCoursEdition.value.id, garageEnCoursEdition.value)
      .then(() => {
        return listerGarages();
      })
      .then((data) => {
        garages.value = data;
        fermerModal();
      })
      .catch((error) => {
        console.error('Erreur lors de la mise à jour du garage:', error);
      });
  };
  
  const AjoutGarage = () => {
    ajouterGarage(newGarage)
      .then(() => {
        return listerGarages();
      })
      .then((data) => {
        garages.value = data;
        fermerModal();
      })
      .catch((error) => {
        console.error('Erreur lors de l\'ajout du garage:', error);
      });
  };
  
  const fermerModal = () => {
    afficherModal.value = false;
  };
  
  const supprimer_garage = (id) => {
    try {
      supprimerGarage(id).then(() => {
        listerGarages().then((data) => {
          garages.value = data;
        });
      });
    } catch (errors) {
      console.log(errors);
    }
  };
  </script>
  
<style scoped>

</style>