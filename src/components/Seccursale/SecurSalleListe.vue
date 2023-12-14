<template>
    <h1 class="h1 d-flex justify-content-center text-white mt-4">
      Liste des salles sécurisées
    </h1>
  
    <div class="d-flex justify-content-end"><button
      class="btn btn-dark m-2 "
      @click="ajouterSecurSalleModal"
      data-bs-toggle="modal"
      data-bs-target="#ajouter_securSalle_modal"
    >
      Ajouter
    </button></div>
    <table class="table table-hover table-dark">
      <thead>
        <tr>
          <th>ID</th>
          <th>Adresse de la salle</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <SecurSalleRow
          v-for="securSalle in securSalles"
          :key="securSalle.id"
          :securSalle="securSalle"
          @editer_securSalle="editerSecurSalle"
          @supprimer_securSalles="supprimerSecurSalles"
        />
      </tbody>
    </table>
    
    
  
  
    <!-- Modal de modification -->
    <div class="modal" id="modification_securSalle" data-bs-theme="dark">
        <div class="modal-dialog">
  <div class="modal-content">
    <!-- Modal Header -->
    <div class="modal-header">
      <h4 class="modal-title text-warning">
        Modifier les informations de la salle sécurisée
      </h4>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="modal"
        @click="fermerModal"
      ></button>
    </div>

    <!-- Modal body -->
    <div class="modal-body">
      <form @submit.prevent="gererEdition">
        <div class="form-group">
          <label for="AdresseSalle" class="text-warning">Adresse de la salle:</label>
          <input
            type="text"
            class="form-control"
            id="AdresseSalle"
            v-model="securSalleEnCoursEdition.adresseDeLaSecurSalle"
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
    <div class="modal" id="ajouter_securSalle_modal" data-bs-theme="dark">
        <div class="modal-dialog">
  <div class="modal-content">
    <!-- Modal Header -->
    <div class="modal-header">
      <h4 class="modal-title text-warning">
        Ajouter une salle sécurisée
      </h4>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="modal"
        @click="fermerModal"
      ></button>
    </div>

    <!-- Modal body -->
    <div class="modal-body">
      <form @submit.prevent="ajouterSecurSalleFn">
        <div class="form-group">
          <label for="AdresseSalle" class="text-warning">Adresse de la salle:</label>
          <input
            type="text"
            class="form-control"
            id="AdresseSalle"
            v-model="newSecurSalle.adresseDeLaSecurSalle"
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
  import SecurSalleRow from './SecurSalleRow.vue';
  import { ref, onBeforeMount, reactive } from 'vue';
  import { useSecurSalle } from '../../service/server';
  
  const { listerSecurSalles, ajouterSecurSalle, supprimerSecurSalle, modifierSecurSalle } = useSecurSalle();
  
  const securSalles = ref([]);
  const newSecurSalle = reactive({
    adresseDeLaSecurSalle: ''
  });
  
  onBeforeMount(() => {
    listerSecurSalles().then((data) => {
      securSalles.value = data;
    });
  });
  
  const afficherModal = ref(false);
  
  const ajouterSecurSalleModal = () => {
    afficherModal.value = true;
  };
  
  const ajouterSecurSalleFn = () => {
    ajouterSecurSalle(newSecurSalle).then(() => {
      return listerSecurSalles();
    }).then((data) => {
      securSalles.value = data;
      fermerModal();
    });
  };
  
  const securSalleEnCoursEdition = ref({});
  
  const editerSecurSalle = (securSalle) => {
    securSalleEnCoursEdition.value = { ...securSalle };
    afficherModal.value = true;
  };
  
  const fermerModal = () => {
    afficherModal.value = false;
  };
  
  const gererEdition = () => {
    modifierSecurSalle(
      securSalleEnCoursEdition.value.id,
      securSalleEnCoursEdition.value
    ).then(() => {
      return listerSecurSalles();
    }).then((data) => {
      securSalles.value = data;
      fermerModal();
    }).catch((error) => {
      console.error('Erreur lors de la mise à jour de la salle sécurisée:', error);
    });
  };
  
  const supprimerSecurSalles = (id) => {
    supprimerSecurSalle(id).then(() => {
      return listerSecurSalles();
    }).then((data) => {
      securSalles.value = data;
    }).catch((error) => {
      console.error('Erreur lors de la suppression de la salle sécurisée:', error);
    });
  };
  </script>
  
  <style scoped>
  /* Vos styles CSS ici */
  </style>
  