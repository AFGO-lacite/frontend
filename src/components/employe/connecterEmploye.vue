<template>
    <div class="container-fluid bg-dark login-container ">
    <h2 class="text-white justify-content-center">Connexion pour Employé</h2>
    <form @submit.prevent="connecter">
      <div class="form-group">
        <label class="text-white" for="Email">Adresse électronique:</label>
        <input type="email" id="Email" v-model="user.Email" required>
      </div>

      <div class="form-group">
        <label class="text-white" for="Mot_De_Passe ">Mot de passe:</label>
        <input type="password" id="Mot_De_Passe " v-model="user.Mot_De_Passe " required>
      </div >
      <div class="d-flex justify-content-end"><button type="submit">Connexion</button></div>
      
    </form>

    <div class="alert alert-danger alert-dismissible mt-4" v-if="messageErreur">
    <button type="button" class="btn-close" @click="reinitialiserEtNaviguer"></button>
    <strong>Erreur !</strong> {{ messageErreur }}
</div>

  </div>
</template><script setup>
import { ref, nextTick } from 'vue';
import { useRouter } from 'vue-router'; 
import { loginEmploye } from '../../service/server';

const router = useRouter();
const user = ref({ Email: '', Mot_De_Passe: '' });
const messageErreur = ref(null);



const reinitialiserEtNaviguer = () => {
    messageErreur.value = null;
    router.push('/connecterEmploye');
};




const connecter = async () => {
    // Réinitialiser le message d'erreur
    messageErreur.value = null;

    try {
        const { data, token } = await loginEmploye(user.value.Email, user.value.Mot_De_Passe);
        localStorage.clear();
        localStorage.setItem('employeeToken', token);

        // Utilisation de nextTick pour la navigation
        
            router.push('/BoardEmploye');
        
    } catch (err) {
        if (err.response && err.response.data) {
            messageErreur.value = err.response.data.message;

           
        } else {
            messageErreur.value = "Une erreur est survenue lors de la connexion.";
        }
        console.error("Erreur de connexion:", messageErreur.value);
    }
};
</script>



<style  scoped>
.login-container {
  max-width: 300px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 5rem;
  
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="email"], input[type="password"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 10px 15px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
</style>