<template>
    <div class="container-fluid bg-dark login-container ">
    <h2 class="text-white justify-content-center">Connexion pour client</h2>
    <form @submit.prevent="login">
      <div class="form-group">
        <label class="text-white" for="email">Adresse électronique:</label>
        <input type="email" id="email" v-model="user.Email" required>
      </div>

      <div class="form-group">
        <label class="text-white" for="password">Mot de passe:</label>
        <input type="password" id="password" v-model="user.Mot_De_Passe" required>
      </div >
      <div class="d-flex justify-content-end"><button type="submit">Connexion</button></div>
      
    </form>
    <div class="alert alert-danger alert-dismissible mt-4" v-if="messageErreur">
    <button type="button" class="btn-close" @click="reinitialiserEtNaviguer"></button>
    <strong>Erreur !</strong> {{ messageErreur }}</div>
  </div>
</template>

<script setup>
   import { ref } from 'vue';
   import { useRouter } from 'vue-router'; 
   import { loginCliente } from '../../service/server';
   import useAuthStore from '../../stores/auth';
const { setUser } = useAuthStore()

   const router = useRouter();

const user = ref({
  email: '',
  password: ''
});

const messageErreur = ref(null);

const reinitialiserEtNaviguer = () => {
    messageErreur.value = null;
    router.push('/Se connecter');
};


const login = async() => {

  
  try {
    const { data, token }  =await loginCliente(user.value.Email, user.value.Mot_De_Passe)
      
        localStorage.clear();
        localStorage.setItem('clientToken', token);
        setUser(data.data)
        router.push('/reservationclient')
    

        // Utilisation de nextTick pour la navigation
        
          
        
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