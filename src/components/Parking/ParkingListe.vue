<template>
    <h1 class="h1 d-flex justify-content-center text-white mt-4">
      Liste des parkings
    </h1>

    <div class="d-flex justify-content-end">
        <button
          class="btn btn-dark m-2"
          @click="$emit('ajouter_parkings')"
          data-bs-toggle="modal"
          data-bs-target="#ajouter_parking_modal"
        >
          Ajouter
        </button>
    </div>
  
    <table class="table table-hover  table-dark">
      <thead>
        <tr>
          <th>Couleur du parking</th>
          <th>SecurSalle</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <ParkingRow
          v-for="parking in parkings"
          :key="parking.couleurDuParking"
          :parking="parking"
          @ajouter_parkings="ajouter_parkings"
          @supprimer_parking="supprimer_parking"
          @editer_parking="editer_parking"
        />
      </tbody>
    </table>
  
    <!-- Modal de modification -->
    <div class="modal" id="modification_parking" data-bs-theme="dark">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title text-warning">Modifier les informations du parking</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
  
          <!-- Modal body -->
          <div class="modal-body">
            <form @submit.prevent="miseAJourParking">
              <div class="form-group">
                <label for="CouleurDuParking" class="text-warning">Couleur du parking:</label>
                <input
                  type="text"
                  class="form-control"
                  id="CouleurDuParking"
                  v-model="parkingEnCoursEdition.couleurDuParking"
                  required
                />
              </div>
              <div class="form-group">
              <label for="SecurSalle" class="text-warning">Seccursale</label>
              <select
                class="form-control"
                id="SecurSalle"
                v-model="parkingEnCoursEdition.SecurSalleId"
                required
              >
                <option value="" disabled selected>Sélectionnez une secursale</option>
                <option v-for="securSalle in seccursalles" :key="securSalle.id" :value="securSalle.id">
                  {{ securSalle.adresseDeLaSecurSalle }}
                </option>
              </select>
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
    <div class="modal" id="ajouter_parking_modal" data-bs-theme="dark">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title text-warning">Ajouter un parking</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
  
          <!-- Modal body -->
          <div class="modal-body">
            <form @submit.prevent="AjoutParking">
              <div class="form-group">
                <label for="CouleurDuParking" class="text-warning">Couleur du parking:</label>
                <input
                  type="text"
                  class="form-control"
                  id="CouleurDuParking"
                  v-model="newParking.couleurDuParking"
                  required
                />
              </div>
              <div class="form-group">
              <label for="SecurSalle" class="text-warning">Secursalle:</label>
              <select
                class="form-control"
                id="SecurSalle"
                v-model="newParking.SecurSalleId"
                required
              >
                <option value="" disabled selected>Sélectionnez une Sécursalle</option>
                <option v-for="securSalle in seccursalles" :key="securSalle.id" :value="securSalle.id">
                  {{ securSalle.adresseDeLaSecurSalle }}
                </option>
              </select>
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
  import ParkingRow from './ParkingRow.vue';
  import { ref, onBeforeMount, reactive } from 'vue';
  import { useParking } from '../../service/server';
  import { useSecurSalle } from '../../service/server';
  const { listerParkings, ajouterParking, supprimerParking, modifierParking } = useParking();
  const {listerSecurSalles}=useSecurSalle()
  const parkings = ref([]);
  const newParking = reactive({
    couleurDuParking: '',
    SecurSalleId: '',
  });
  
  const seccursalles = ref([]);

onBeforeMount(() => {
  listerSecurSalles().then((data) => {
    seccursalles.value = data;
  });
});


  const parkingEnCoursEdition = ref({});
  
  onBeforeMount(() => {
    listerParkings().then((data) => {
      parkings.value = data;
    });
  });
  
  const afficherModal = ref(false);
  
  const ajouter_parkings = () => {
    afficherModal.value = true;
  };
  
  const AjoutParking = () => {
    ajouterParking(newParking)
      .then(() => {
        return listerParkings();
      })
      .then((data) => {
        parkings.value = data;
        fermerModal();
      })
      .catch((error) => {
        console.error('Erreur lors de l\'ajout du parking:', error);
      });
  };
  
  const editer_parking = (parking) => {
    parkingEnCoursEdition.value = { ...parking };
    afficherModal.value = true;
  };
  
  const fermerModal = () => {
    afficherModal.value = false;
  };
  
  const miseAJourParking = () => {
    modifierParking(parkingEnCoursEdition.couleurDuParking, parkingEnCoursEdition)
      .then(() => {
        return listerParkings();
      })
      .then((data) => {
        parkings.value = data;
        fermerModal();
      })
      .catch((error) => {
        console.error('Erreur lors de la mise à jour du parking:', error);
      });
  };
  
  const supprimer_parking = (couleurDuParking) => {
    try {
      supprimerParking(couleurDuParking).then(() => {
        listerParkings().then((data) => {
          parkings.value = data;
        });
      });
    } catch (errors) {
      console.log(errors);
    }
  };
  </script>
  
  <style scoped></style>
  