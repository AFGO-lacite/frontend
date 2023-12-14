<template>
  <h1 class="h1 d-flex justify-content-center text-white mt-4">
    Liste des employées
  </h1>
  <div >
    <table class="table table-hover  table-dark">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nom</th>
          <th>Prenom</th>

          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <EmployeRow
          v-for="employe in employes"
          :key="employe.id"
          :employe="employe"
          @supprimer="supprimer"
          @editer="editer"
          @detail="detail"
        />
      </tbody>
    </table>

    <!-- The Modal -->
    <div class="modal" id="myModal" data-bs-theme="dark">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title text-warning">
              Modifier les informations de l'employé
            </h4>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <!-- Modal body -->
          <div class="modal-body">
            <form @submit.prevent="miseAJourEmploye">
              <div class="form-group">
                <label for="employeNom" class="text-warning">Nom:</label>
                <input
                  type="text"
                  class="form-control"
                  id="employeNom"
                  v-model="employeEnCoursEdition.Nom"
                  required
                />
              </div>

              <div class="form-group">
                <label for="employePrenom" class="text-warning">Prénom:</label>
                <input
                  type="text"
                  class="form-control"
                  id="employePrenom"
                  v-model="employeEnCoursEdition.Prenom"
                  required
                />
              </div>

              <div class="form-group">
                <label for="employeRole" class="text-warning">Rôle:</label>
                <select
                  class="form-control"
                  id="RoleId"
                  v-model="employeEnCoursEdition.RoleId"
                >
                  <option v-for="role in roles" :key="role.id" :value="role.id">
                    {{ role.Nom_Du_Role }}
                  </option>
                </select>
              </div>

              <div class="form-group">
                <label for="employeSeccursale" class="text-warning"
                  >Seccursale:</label
                >
                <select
                  class="form-control"
                  id="SeccurSalleId"
                  v-model="employeEnCoursEdition.SecurSalleId"
                >
                  <option
                    v-for="seccursalle in seccursalles"
                    :key="seccursalle.id"
                    :value="seccursalle.id"
                  >
                    {{ seccursalle.adresseDeLaSecurSalle }}
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

    <!-- Details -->
    <div class="modal" id="Modal_detail" data-bs-theme="dark">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title text-warning">Details de l'employé</h4>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
            ></button>
          </div>

          <!-- Modal body -->
          <div class="modal-body">
            <div class="form-group">
              <label for="employeNom" class="text-warning">Nom:</label>
              <div id="employeNom" class="text-display">
                <p class="text-white">{{ _employe.Nom }}</p>
              </div>
            </div>

            <div class="form-group">
              <label for="employePrenom" class="text-warning">Prénom:</label>
              <div id="employePrenom" class="text-display">
                <p class="text-white">{{ _employe.Prenom }}</p>
              </div>
            </div>

            <div class="form-group">
              <label for="employePrenom" class="text-warning">Téléphone:</label>
              <div id="employePrenom" class="text-display">
                <p class="text-white">{{ _employe.Telephone }}</p>
              </div>
            </div>

            <div class="form-group">
              <label for="employePrenom" class="text-warning"
                >Date de naissance:</label
              >
              <div id="employePrenom" class="text-display">
                <p class="text-white">{{ _employe.Naissance }}</p>
              </div>
            </div>

            <div class="form-group">
              <label for="employePrenom" class="text-warning">Émail:</label>
              <div id="employePrenom" class="text-display">
                <p class="text-white">{{ _employe.Email }}</p>
              </div>
            </div>

            <div class="form-group">
              <label for="employeRole" class="text-warning">Rôle:</label>
              <div id="RoleId" class="text-display">
                <p class="text-white">
                  {{
                    roles.find((role) => role.id === _employe.RoleId)
                      ?.Nom_Du_Role
                  }}
                </p>
              </div>
            </div>

            <div class="form-group">
              <label for="employeSeccursale" class="text-warning"
                >Seccursale:</label
              >
              <div id="SeccurSalleId" class="text-display">
                <p class="text-white">
                  {{
                    seccursalles.find(
                      (seccursalle) => seccursalle.id === _employe.SecurSalleId
                    )?.adresseDeLaSecurSalle
                  }}
                </p>
              </div>
            </div>
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
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from "vue";
import EmployeRow from "./Employes.vue";
import { useEmploye } from "../../service/server.js";
import ListeRole from "../role/Role.vue";
import { useRole } from "../../service/server.js";
import { useSecurSalle } from "../../service/server.js";
const { listerRoles } = useRole();
const { listerSecurSalles } = useSecurSalle();
const roles = ref([]);
onBeforeMount(() => {
  listerRoles().then((data) => {
    roles.value = data;
  });
});

const seccursalles = ref([]);

onBeforeMount(() => {
  listerSecurSalles().then((data) => {
    seccursalles.value = data;
  });
});

const employeEnCoursEdition = ref({});

const _employe = ref({});

const afficherModal = ref(false);

const editer = (employe) => {
  employeEnCoursEdition.value = { ...employe };
  afficherModal.value = true; // Ouvre le modal
};

const detail = (employe) => {
  console.log("coucou");
  _employe.value = { ...employe };
  afficherModal.value = true; // Ouvre le modal
};

const fermerModal = () => {
  afficherModal.value = false;
};

const gererEdition = () => {
  console.log(
    "Role avant la mise à jour:",
    employeEnCoursEdition.value.Role,
    typeof employeEnCoursEdition.value.Role
  );

  modifierPartiellementEmploye(
    employeEnCoursEdition.value.id,
    employeEnCoursEdition.value
  )
    .then(() => {
      // Après la mise à jour réussie, rafraîchir la liste des employés
      return listerEmployes();
    })
    .then((data) => {
      // Mettre à jour la liste des employés avec les nouvelles données
      employes.value = data;
      // Fermer le modal après la mise à jour de la liste
      fermerModal();
    })
    .catch((error) => {
      console.error("Erreur lors de la mise à jour de l'employé:", error);
      // Gérer l'erreur ici, par exemple en affichant un message à l'utilisateur
    });
};

const { listerEmployes, supprimerEmploye, modifierPartiellementEmploye } =
  useEmploye();
const employes = ref([]);

onBeforeMount(() => {
  listerEmployes().then((data) => {
    employes.value = data;
  });
});

const supprimer = (id) => {
  supprimerEmploye(id).then(() => {
    listerEmployes().then((data) => {
      employes.value = data;
    });
  });
};
</script>

<style scoped>
/* Your styles here */
</style>
