<template>
  <div>
    <h1 class="h1 d-flex justify-content-center text-white mt-4">
      Liste des Maintenances
    </h1>

    <div class="d-flex justify-content-end">
      <button
        class="btn btn-dark m-2"
        @click="afficherModalAjout = true"
        data-bs-toggle="modal"
        data-bs-target="#ajouter_maintenance_modal"
      >
        Ajouter Maintenance
      </button>
    </div>

    <table class="table table-hover table-dark">
      <thead>
        <tr>
          <th>Id</th>
          <th>Type de maintenance</th>
          <th>Date de debut</th>
          <th>Date de fin</th>
          <th>Voiture</th>
          <th>Garage</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <MaintenanceRow
          v-for="maintenance in maintenances"
          :key="maintenance.id"
          :maintenance="maintenance"
          @editerMaintenance="preparerEdition"
          @supprimerMaintenance="supprimerMaintenances"
        />
      </tbody>
    </table>

    <!-- Modal d'ajout -->
    <div class="modal" id="ajouter_maintenance_modal" data-bs-theme="dark">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title text-warning">Ajouter une Maintenance</h4>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <!-- Modal body -->
          <div class="modal-body">
            <form @submit.prevent="ajouterMaintenances">
              <!-- Champs de formulaire -->
              <div class="form-group">
                <label for="typeMaintenance" class="text-warning"
                  >Type de Maintenance:</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="typeMaintenance"
                  v-model="nouvelleMaintenance.TypeDeMaintenance"
                  required
                />
              </div>
              <div class="form-group">
                <label for="dateDebut" class="text-warning"
                  >Date de Début:</label
                >
                <input
                  type="date"
                  class="form-control"
                  id="dateDebut"
                  v-model="nouvelleMaintenance.DateDeDebut"
                  required
                />
              </div>
              <div class="form-group">
                <label for="dateFin" class="text-warning">Date de Fin:</label>
                <input
                  type="date"
                  class="form-control"
                  id="dateFin"
                  v-model="nouvelleMaintenance.DateDeFin"
                  required
                />
              </div>
              <div
                class="form-group"
                v-if="voitures && voitures.data && voitures.data.length > 0"
              >
                <label for="voiture" class="text-warning">Voiture:</label>
                <select
                  class="form-control"
                  id="voiture"
                  v-model="nouvelleMaintenance.VoitureId"
                  required
                >
                  <option value="" disabled selected>
                    Sélectionnez une voiture
                  </option>
                  <option
                    v-for="voiture in voitures.data"
                    :key="voiture.id"
                    :value="voiture.id"
                  >
                    {{ voiture.Marque }} - {{ voiture.Modele }}
                  </option>
                </select>
              </div>

              <div class="form-group">
                <label for="garage" class="text-warning">Garage:</label>
                <select
                  class="form-control"
                  id="garage"
                  v-model="nouvelleMaintenance.GarageDeMaintenanceId"
                  required
                >
                  <option value="" disabled selected>
                    Sélectionnez un garage
                  </option>
                  <option
                    v-for="garage in garages"
                    :key="garage.id"
                    :value="garage.id"
                  >
                    {{ garage.nomDuGarage }}
                  </option>
                </select>
              </div>

              <!-- Modal footer -->
              <div class="modal-footer">
                <button type="submit" class="btn btn-warning">Ajouter</button>
                <button
                  type="button"
                  class="btn btn-danger"
                  data-bs-dismiss="modal"
                >
                  Fermer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal d'édition -->
    <div class="modal" id="modifier_maintenance_modal" data-bs-theme="dark">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title text-warning">Modifier la Maintenance</h4>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <!-- Modal body -->
          <div class="modal-body">
            <form @submit.prevent="modifierMaintenances">
              <!-- Champs de formulaire -->
              <div class="form-group">
                <label for="typeMaintenanceEdit" class="text-warning"
                  >Type de Maintenance:</label
                >
                <input
                  type="text"
                  class="form-control"
                  id="typeMaintenanceEdit"
                  v-model="maintenanceEnCoursEdition.TypeDeMaintenance"
                  required
                />
              </div>
              <div class="form-group">
                <label for="dateDebutEdit" class="text-warning"
                  >Date de Début:</label
                >
                <input
                  type="date"
                  class="form-control"
                  id="dateDebutEdit"
                  v-model="maintenanceEnCoursEdition.DateDeDebut"
                  required
                />
              </div>
              <div class="form-group">
                <label for="dateFinEdit" class="text-warning"
                  >Date de Fin:</label
                >
                <input
                  type="date"
                  class="form-control"
                  id="dateFinEdit"
                  v-model="maintenanceEnCoursEdition.DateDeFin"
                  required
                />
              </div>
              <div class="form-group">
                <label for="voitureEdit" class="text-warning">Voiture:</label>
                <select
                  class="form-control"
                  id="voitureEdit"
                  v-model="maintenanceEnCoursEdition.VoitureId"
                  required
                >
                  <option value="" disabled selected>
                    Sélectionnez une voiture
                  </option>
                  <option
                  v-for="voiture in voitures.data"
                    :key="voiture.id"
                    :value="voiture.id"
                  >
                    {{ voiture.Marque }} - {{ voiture.Modele }}
                  </option>
                </select>
              </div>
              <div class="form-group">
                <label for="garageEdit" class="text-warning">Garage:</label>
                <select
                  class="form-control"
                  id="garageEdit"
                  v-model="maintenanceEnCoursEdition.GarageDeMaintenanceId"
                  required
                >
                  <option value="" disabled selected>
                    Sélectionnez un garage
                  </option>
                  <option
                    v-for="garage in garages"
                    :key="garage.id"
                    :value="garage.id"
                  >
                    {{ garage.nomDuGarage }}
                  </option>
                </select>
              </div>

              <!-- Modal footer -->
              <div class="modal-footer">
                <button type="submit" class="btn btn-warning">
                  Mettre à jour
                </button>
                <button
                  type="button"
                  class="btn btn-danger"
                  data-bs-dismiss="modal"
                >
                  Fermer
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import MaintenanceRow from "./MaintenanceRow.vue";
import {
  useMaintenance,
  useVoiture,
  useGarageDeMaintenance,
} from "../../service/server";

// Initialisation des services et des données
const {
  listerMaintenances,
  ajouterMaintenance,
  modifierMaintenance,
  supprimerMaintenance,
} = useMaintenance();
const { listeVoiture } = useVoiture();
const { listerGarages } = useGarageDeMaintenance();

// Déclaration des variables réactives
const maintenances = ref([]);
const voitures = ref([]);
const garages = ref([]);
const afficherModalAjout = ref(false);
const afficherModalEdition = ref(false);
const nouvelleMaintenance = ref({
  TypeDeMaintenance: "",
  DateDeDebut: "",
  DateDeFin: "",
  VoitureId: "",
  GarageDeMaintenanceId: "",
});
const maintenanceEnCoursEdition = ref({});

onMounted(async () => {
  maintenances.value = await listerMaintenances();
  voitures.value = await listeVoiture();
  garages.value = await listerGarages();

  console.log(voitures.value);
});

const ajouterMaintenances = async () => {
  try {
    await ajouterMaintenance(nouvelleMaintenance.value); // Fonction d'ajout fournie par votre service
    maintenances.value = await listerMaintenances(); // Mise à jour de la liste des maintenances
    afficherModalAjout.value = false; // Fermeture du modal
  } catch (error) {
    console.error("Erreur lors de l'ajout de la maintenance:", error);
  }
};

const preparerEdition = (maintenance) => {
  maintenanceEnCoursEdition.value = { ...maintenance }; // Copie de l'objet maintenance pour l'édition
  afficherModalEdition.value = true; // Ouverture du modal d'édition
};

const modifierMaintenances = async () => {
  try {
    await modifierMaintenance(
      maintenanceEnCoursEdition.value.id,
      maintenanceEnCoursEdition.value
    ); // Fonction de modification
    maintenances.value = await listerMaintenances(); // Mise à jour de la liste des maintenances
    afficherModalEdition.value = false; // Fermeture du modal
  } catch (error) {
    console.error("Erreur lors de la modification de la maintenance:", error);
  }
};

const supprimerMaintenances = async (id) => {
  try {
    await supprimerMaintenance(id); // Fonction de suppression
    maintenances.value = await listerMaintenances(); // Mise à jour de la liste des maintenances
  } catch (error) {
    console.error("Erreur lors de la suppression de la maintenance:", error);
  }
};
</script>

<style scoped>
/* CSS personnalisé ici */
</style>
