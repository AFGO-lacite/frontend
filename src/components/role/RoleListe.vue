<template>
    <h1 class="h1 d-flex justify-content-center text-white mt-4">
    Liste des des roles
  </h1>
  <div  class="d-flex justify-content-end">
    <button
        class="btn btn-dark  m-2"
        
        @click="$emit('ajouter_roles')"
        data-bs-toggle="modal"
        data-bs-target="#ajouter_role_modal"
      >
        Ajouter
      </button> 

  </div>

    <table class="table table-hover  table-dark">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nom du role</th>
          <th>Action</th>

          
        </tr>
      </thead>
      <tbody>
        <RoleRow
          v-for="role in roles"
          :key="role.id"
          :role="role"
          @ajouter_roles="ajouter_roles"
          @supprimer_role="supprimer_role"
          @editer_role="editer_role"
          
        />
      </tbody>
    </table>

    <!-- Modal de modificatiom -->
    <div class="modal" id="modification_role" data-bs-theme="dark">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title text-warning">
              Modifier les informations du role
            </h4>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <!-- Modal body -->
          <div class="modal-body">
            <form @submit.prevent="miseAJourRole">
              <div class="form-group">
                <label for="RoleNom" class="text-warning">Nom du role:</label>
                <input
                  type="text"
                  class="form-control"
                  id="roleNom"
                  v-model="roleEnCoursEdition.Nom_Du_Role"
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
    <div class="modal" id="ajouter_role_modal" data-bs-theme="dark">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title text-warning">
              Ajouter un role
            </h4>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <!-- Modal body -->
          <div class="modal-body">
            <form @submit.prevent="AjoutRole">
              <div class="form-group">
                <label for="RoleNom" class="text-warning">Nom du role:</label>
                <input
                  type="text"
                  class="form-control"
                  id="roleNom"
                  v-model="newRole.Nom_Du_Role"
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
import RoleRow from './Role.vue'
import { ref, onBeforeMount, reactive } from "vue";
import { useRole } from "../../service/server";
const { listerRoles, ajouterRole, supprimerRole, modifierRole } = useRole();
const roles = ref([]);

const newRole= reactive({
    Nom_Du_Role:""
  });




onBeforeMount(() => {
  listerRoles().then((data) => {
    roles.value = data;
  });
});   


const afficherModal = ref(false);

const ajouter_roles=()=>{
  
  afficherModal.value = true;
}

const AjoutRole=()=>{
  console.log(newRole.Nom_Du_Role)
  ajouterRole(newRole).then(() => {
      // Après la mise à jour réussie, rafraîchir la liste des employés
      return listerRoles();
    })
    .then((data) => {
      // Mettre à jour la liste des employés avec les nouvelles données
      roles.value = data;
      // Fermer le modal après la mise à jour de la liste
      fermerModal();
    })
}

const roleEnCoursEdition = ref({});

const _role = ref({});






const editer_role = (role) => {
  console.log("Role édité:", role);
  roleEnCoursEdition.value = { ...role };
  afficherModal.value = true;
};




const fermerModal = () => {
  afficherModal.value = false;
};



const gererEdition = () => {
  console.log(roleEnCoursEdition.value.id)

  modifierRole(
    roleEnCoursEdition.value.id,
    roleEnCoursEdition.value
  )
    .then(() => {
      // Après la mise à jour réussie, rafraîchir la liste des employés
      return listerRoles();
    })
    .then((data) => {
      // Mettre à jour la liste des employés avec les nouvelles données
      roles.value = data;
      // Fermer le modal après la mise à jour de la liste
      fermerModal();
    })
    .catch((error) => {
      console.error("Erreur lors de la mise à jour de l'employé:", error);
      // Gérer l'erreur ici, par exemple en affichant un message à l'utilisateur
    });
};



const supprimer_role = (id) => {
try{

  supprimerRole(id).then(() => {
    listerRoles().then((data) => {
      roles.value = data;
    });
  });
}catch(erros){
  console.log(erros)
}
  
  
};


</script>

<style scoped>

</style>