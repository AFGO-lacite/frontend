<template>
    <div>
      <h1 class="h1 d-flex justify-content-center text-white mt-4">Liste des voitures</h1>
  
      <div class="d-flex justify-content-end">
        <button
          class="btn btn-dark m-2"
          @click="afficherModalAjout"
          data-bs-toggle="modal"
          data-bs-target="#ajouter_voiture_modal"
        >
          Ajouter
        </button>
      </div>
  
      <table class="table table-hover table-dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Marque</th>
            <th>Modèle</th>
            <th>Type de voiture</th>
            <th>Année de fabrication</th>
            <th>Disponibilité</th>
            <th>Prix par jour</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
  <VoitureRow
    v-for="mavoiture in voitures.data"
    :key="mavoiture.id"
    :mavoiture="mavoiture"
    @editerVoituress="editerVoituress"
    @supprimerVoitures="supprimerVoitures" 
  />
</tbody>

      </table>
  
      <!-- Modal d'ajout -->
<div class="modal" id="ajouter_voiture_modal" data-bs-theme="dark">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title text-warning">Ajouter une voiture</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal" @click="fermerModalAjout"></button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="ajouterVoiture">
          <div class="form-group">
            <label for="numeroChassi" class="text-warning">VIN :</label>
            <input type="text" class="form-control" id="numeroChassi" v-model="newVoiture.id" required />
          </div>
          <div class="form-group">
            <label for="marque" class="text-warning">Marque :</label>
            <input type="text" class="form-control" id="marque" v-model="newVoiture.Marque" required />
          </div>
          <div class="form-group">
            <label for="modele" class="text-warning">Modèle :</label>
            <input type="text" class="form-control" id="modele" v-model="newVoiture.Modele" required />
          </div>
          <div class="form-group">
            <label for="typeVoiture" class="text-warning">Type de voiture :</label>
            <input type="text" class="form-control" id="typeVoiture" v-model="newVoiture.Type_de_voiture" required />
          </div>
          <div class="form-group">
            <label for="anneeFabrication" class="text-warning">Année de fabrication :</label>
            <input type="number" class="form-control" id="anneeFabrication" v-model="newVoiture.Annee_de_fabrication" required />
          </div>
          
          <div class="form-group">
            <label for="prixParJour" class="text-warning">Prix par jour :</label>
            <input type="number" class="form-control" id="prixParJour" v-model="newVoiture.Prix_par_jour" required />
          </div>

          <div class="form-group">
            <label for="parking" class="text-warning">Parking :</label>
            <select class="form-control" id="parking" v-model="newVoiture.ParkingCouleurDuParking">
              <option value="">Sélectionnez un parking</option>
              <option v-for="parking in parkings" :key="parking.id" :value="parking.couleurDuParking">
                {{ parking.couleurDuParking }}
              </option>
            </select>
          </div>


          <div class="form-group mt-3">
            <button type="submit" class="btn btn-warning">Ajouter</button>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="fermerModalAjout">
          Fermer
        </button>
      </div>
    </div>
  </div>
</div>

  
      <!-- Modal d'édition -->
<div class="modal" id="editer_voiture_modal" data-bs-theme="dark">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h4 class="modal-title text-warning">Éditer la voiture</h4>
        <button type="button" class="btn-close" data-bs-dismiss="modal" @click="fermerModalEdition"></button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="editerVoitures">
          <div class="form-group">
            <label for="editNumeroChassi" class="text-warning">VIN :</label>
            <input type="text" class="form-control" id="editNumeroChassi" v-model="voitureEnCoursEdition.id" required />
          </div>
          <div class="form-group">
            <label for="editMarque" class="text-warning">Marque :</label>
            <input type="text" class="form-control" id="editMarque" v-model="voitureEnCoursEdition.Marque" required />
          </div>
          <div class="form-group">
            <label for="editModele" class="text-warning">Modèle :</label>
            <input type="text" class="form-control" id="editModele" v-model="voitureEnCoursEdition.Modele" required />
          </div>
          <div class="form-group">
            <label for="editTypeVoiture" class="text-warning">Type de voiture :</label>
            <input type="text" class="form-control" id="editTypeVoiture" v-model="voitureEnCoursEdition.Type_de_voiture" required />
          </div>
          <div class="form-group">
            <label for="editAnneeFabrication" class="text-warning">Année de fabrication :</label>
            <input type="number" class="form-control" id="editAnneeFabrication" v-model="voitureEnCoursEdition.Annee_de_fabrication" required />
          </div>
          <div class="form-group">
            <label for="editPrixParJour" class="text-warning">Prix par jour :</label>
            <input type="number" class="form-control" id="editPrixParJour" v-model="voitureEnCoursEdition.Prix_par_jour" required />
          </div>
          <div class="form-group">
            <label for="editParking" class="text-warning">Parking :</label>
            <select class="form-control" id="editParking" v-model="voitureEnCoursEdition.ParkingCouleurDuParking">
              <option value="">Sélectionnez un parking</option>
              <option v-for="parking in parkings" :key="parking.id" :value="parking.couleurDuParking">
                {{ parking.couleurDuParking }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="editDisponibilite" class="text-warning">Disponibilité :</label>
            <input type="checkbox" class="form-check-input" id="editDisponibilite" v-model="voitureEnCoursEdition.Disponibilite" />
          </div>

          <div class="form-group mt-3">
            <button type="submit" class="btn btn-warning">Mettre à jour</button>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="fermerModalEdition">
          Fermer
        </button>
      </div>
    </div>
  </div>
</div>



</div>

  </template>
  
  <script setup>
  import VoitureRow from './VoitureRow.vue';
  import { ref, onBeforeMount, reactive } from 'vue';
  import { useVoiture } from '../../service/server';
  import { useParking } from '../../service/server';
  
  const { listeVoiture, ajoutVoiture, modifierVoiture, supprimerVoiture, voitureParId } = useVoiture();
  const { listerParkings } = useParking();
  
  const voitures = ref([]);
  const newVoiture = reactive({
    Marque: '',
    Modele: '',
    Type_de_voiture: '',
    Annee_de_fabrication: null,
    Disponibilite: true,
    Prix_par_jour: null,
    ParkingCouleurDuParking: '',
  });
  
  const voitureEnCoursEdition = reactive({});
  const parkings = ref([]);
  
  onBeforeMount(async () => {
  try {
    const dataVoitures = await listeVoiture();
    voitures.value = dataVoitures;
    console.log(voitures.value); // Cela affichera la structure des données dans la console.
  } catch (error) {
    console.error('Erreur lors de la récupération des voitures:', error);
  }

  try {
    const dataParkings = await listerParkings();
    parkings.value = dataParkings;
  } catch (error) {
    console.error('Erreur lors de la récupération des parkings:', error);
  }
});

  
  const afficherModalAjout = () => {
    newVoiture.Marque = '';
    newVoiture.Modele = '';
    newVoiture.Type_de_voiture = '';
    newVoiture.Annee_de_fabrication = null;
    newVoiture.Disponibilite = true;
    newVoiture.Prix_par_jour = null;
    newVoiture.ParkingCouleurDuParking = '';
  };
  
  const ajouterVoiture = () => {
    ajoutVoiture(newVoiture)
      .then(() => {
        return listeVoiture();
      })
      .then((data) => {
        voitures.value = data;
      })
      .catch((error) => {
        console.error('Erreur lors de l\'ajout de la voiture:', error);
      });
  };
  
  const editerVoituress = (voiture) => {
  


  voitureEnCoursEdition.id = voiture.id;
    voitureEnCoursEdition.Marque = voiture.Marque;
    voitureEnCoursEdition.Modele = voiture.Modele;
    voitureEnCoursEdition.Type_de_voiture = voiture.Type_de_voiture;
    voitureEnCoursEdition.Annee_de_fabrication = voiture.Annee_de_fabrication;
    voitureEnCoursEdition.Disponibilite = voiture.Disponibilite;
    voitureEnCoursEdition.Prix_par_jour = voiture.Prix_par_jour;
    voitureEnCoursEdition.ParkingCouleurDuParking = voiture.ParkingCouleurDuParking;
  const modalEdition = new bootstrap.Modal(document.getElementById('editer_voiture_modal'));
  modalEdition.show(); // Cette ligne ouvre le modal d'édition
};


  const editerVoitures = () => {
    modifierVoiture(voitureEnCoursEdition.id, voitureEnCoursEdition)
      .then(() => {
        return listeVoiture();
      })
      .then((data) => {
        voitures.value = data;
      })
      .catch((error) => {
        console.error('Erreur lors de la mise à jour de la voiture:', error);
      });
  };
  
  const fermerModalAjout = () => {
    const modalAjout = new bootstrap.Modal(document.getElementById('ajouter_voiture_modal'));
    modalAjout.hide();
  };
  
  const fermerModalEdition = () => {
    const modalEdition = new bootstrap.Modal(document.getElementById('editer_voiture_modal'));
    modalEdition.hide();
  };
  
  const supprimerVoitures = (id) => {
    supprimerVoiture(id).then(() => {
        return listeVoiture();
      })
      .then((data) => {
        voitures.value = data;
      })
  };
  </script>
  
  <style scoped></style>
  