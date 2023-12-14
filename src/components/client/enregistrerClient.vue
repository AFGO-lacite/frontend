<template>
  
    <div class="container-fluid bg-dark registration-container">
    <!-- Affichage des erreurs -->
    
      <h2 class="text-white text-center">Inscription pour client</h2>
      <form @submit.prevent="ajouterClients">
        <div class="form-group">
          <label class="text-white form-label justify-content-start" for="nom">Nom:</label>
          <input class="form-control" type="text" id="nom" v-model="client.nom" required>
        </div>
  
        <div class="form-group">
          <label class="text-white form-label justify-content-start" for="prenom">Prénom:</label>
          <input class="form-control" type="text" id="prenom" v-model="client.prenom" required>
        </div>
  
        <div class="form-group">
          <label class="text-white form-label justify-content-start" for="dateDeNaissance">Date de Naissance:</label>
          <input class="form-control" type="date" id="dateDeNaissance" v-model="client.dateDeNaissance" required>
        </div>
  
        <div class="form-group">
          <label class="text-white form-label justify-content-start" for="email">Adresse électronique:</label>
          <input class="form-control" type="email" id="email" v-model="client.email" required>
        </div>
  
        <div class="form-group">
          <label class="text-white form-label justify-content-start" for="password">Mot de passe:</label>
          <input class="form-control" type="password" id="password" v-model="client.motDePasse" required>
        </div>
  
        <div class="form-group">
          <label class="text-white form-label justify-content-start" for="photo">Photo:</label>
          <input class="form-control" type="file" id="photo" @change="handleFileUpload" required>
        </div>
  
        <div class="form-group">
          <label class="text-white form-label justify-content-start" for="telephone">Téléphone:</label>
          <input class="form-control" type="tel" id="telephone" v-model="client.telephone" required>
        </div>
  
        <div class="form-group">
          <label class="text-white form-label justify-content-start" for="adressePostale">Adresse Postale:</label>
          <input class="form-control" type="text" id="adressePostale" v-model="client.adressePostale" required>
        </div>
  
        <div class="form-group">
          <label class="text-white form-label d-flex justify-content-start" for="numeroDePermis">Numéro de Permis:</label>
          <input class="form-control" type="text" id="numeroDePermis" v-model="client.numeroDePermis" required>
        </div>
  
        <div class="d-flex justify-content-end">
          <button type="submit">S'inscrire</button>
        </div>

      </form>
      <div v-if="Object.keys(erreurs).length > 0">
    <div class="alert alert-danger alert-dismissible" v-for="(message, champ) in erreurs" :key="champ">
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
      <strong>{{ champ }}:</strong> {{ message }}
    </div>
  </div>
    </div>
  </template>
  
  <script setup>
  import { ref,reactive  } from 'vue';
  import { useClient } from '../../service/server';
  import { useRouter } from 'vue-router';
  const {ajouterClient}=useClient()
  const router = useRouter();
  const erreurs = ref({});
  const client = reactive({
    nom: '',
    prenom: '',
    dateDeNaissance: '',
    email: '',
    motDePasse: '',
    photo: '', // Ici, la photo sera stockée sous forme de chaîne de caractères
    telephone: '',
    adressePostale: '',
    numeroDePermis: ''
  });
  
  const ajouterClients = async () => {
  try {
    const resultat = await ajouterClient(client);
    router.push('/portailClient');
  } catch (error) {
    console.error("Erreur capturée:", error);

    // Vérifiez si la réponse d'erreur existe et contient les détails de l'erreur
    if (error.response && error.response.data) {
      // Affichez les détails de l'erreur
      console.log("Détails de l'erreur:", error.response.data);

      // Mettez à jour l'objet 'erreurs' avec les détails de l'erreur
      erreurs.value = error.response.data;
    } else {
      // Affichez un message d'erreur générique
      erreurs.value = { general: "Une erreur est survenue dans le front-end" };
    }
  }
};


  
  const handleFileUpload = event => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(event.target.files[0]);
    fileReader.onload = e => {
      client.photo = e.target.result; // Assigner la photo encodée en base64
    };
  };
  
  </script>
  
  <style scoped>
  .registration-container {
    max-width: 600px;
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
  