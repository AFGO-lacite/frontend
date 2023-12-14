<template>
    <div class="registration-container m-5">
      <h2 class="text-white text-center">Ajouter une Réservation</h2>
      <div class="row justify-content-center">
        <div class="col-lg-6 col-md-8">
          <form @submit.prevent="ajouterReservations" class="bg-dark p-3 rounded m-3">
            <div class="form-group">
              <label class="text-white form-label" for="debut-ajout">Date de début:</label>
              <input class="form-control" type="date" id="debut-ajout" v-model="nouvelleReservation.Date_de_debut_de_la_reservation" required>
            </div>
            <div class="form-group">
              <label class="text-white form-label" for="fin-ajout">Date de fin:</label>
              <input class="form-control" type="date" id="fin-ajout" v-model="nouvelleReservation.Date_de_fin_de_la_reservation" required>
            </div>
            <div class="form-group">
              <label class="text-white form-label" for="voituree">Voiture :</label>
              <select class="form-control" id="voituree" v-model="nouvelleReservation.VoitureId">
                <option value="">Sélectionnez une voiture</option>
                <option v-for="voiture in voitures.data" :key="voiture.id" :value="voiture.id">
  {{ voiture.Marque }} - {{ voiture.Modele }}
</option>
              </select>
            </div>
            <div class="form-group form-check">
              <input type="checkbox" class="form-check-input" id="editDisponibilite" v-model="nouvelleReservation.Livraison">
              <label class="text-white form-label" for="editDisponibilite">Livraison :</label>
            </div>
            <div class="d-flex justify-content-end">
              <button type="submit" class="btn btn-primary m-2">Ajouter</button>
              <button type="button" class="btn btn-secondary m-2" @click="fermerModalAjout">Annuler</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>

<script setup>
import { format } from 'date-fns';
import { ref, reactive, onBeforeMount } from "vue";
import { useVoiture } from "../../service/server.js";
import { useReservation } from "../../service/server.js";
import { useRouter } from "vue-router";
const router = useRouter();
const { listeVoiture, modifierVoiture } = useVoiture();

const { ajoutReservation } = useReservation();

const nouvelleReservation = reactive({
    Date_de_debut_de_la_reservation: "", // Changé ici
    Date_de_fin_de_la_reservation: "", // Changé ici
    Livraison: false, // Changé en booléen
    VoitureId: "",
    ClientId: 10,
  });

const voitures = ref([]);

onBeforeMount(async () => {
  try {
    const dataVoitures = await listeVoiture();
    voitures.value = dataVoitures;
    console.log(voitures.value); // Cela affichera la structure des données dans la console.
  } catch (error) {
    console.error("Erreur lors de la récupération des voitures:", error);
  }
});

const ajouterReservations = () => {
 console.log(nouvelleReservation.VoitureId)
  ajoutReservation(nouvelleReservation);
  router.push('/reservationclient');
};

const fermerModalAjout =()=>{
    router.push('/reservationclient');
}
</script>

<style scoped></style>
