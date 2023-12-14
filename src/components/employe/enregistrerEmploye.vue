<template>
    <div class="container-fluid bg-dark registration-container">
      <h2 class="text-white text-center">Inscription pour employé</h2>
      <form @submit.prevent="soumettreEmploye">
        <!-- Champs modifiés pour correspondre au contrôleur ajouter_employe -->
        <div class="form-group">
          <label class="text-white form-label" for="Nom">Nom:</label>
          <input class="form-control" type="text" id="Nom" v-model="employe.Nom" required>
        </div>
  
        <div class="form-group">
          <label class="text-white form-label" for="Prenom">Prénom:</label>
          <input class="form-control" type="text" id="Prenom" v-model="employe.Prenom" required>
        </div>
  
        <div class="form-group">
          <label class="text-white form-label" for="Naissance">Date de Naissance:</label>
          <input class="form-control" type="date" id="Naissance" v-model="employe.Naissance" required>
        </div>
  
        <div class="form-group">
          <label class="text-white form-label" for="Telephone">Téléphone:</label>
          <input class="form-control" type="tel" id="Telephone" v-model="employe.Telephone" required>
        </div>
  
        <div class="form-group">
          <label class="text-white form-label" for="Email">Adresse électronique:</label>
          <input class="form-control" type="email" id="Email" v-model="employe.Email" required>
        </div>
  
        <div class="form-group">
          <label class="text-white form-label" for="Mot_De_Passe">Mot de passe:</label>
          <input class="form-control" type="password" id="Mot_De_Passe" v-model="employe.Mot_De_Passe" required>
        </div>
  
        <div class="form-group">
          <label class="text-white form-label" for="Photo">Photo:</label>
          <input class="form-control" type="file" id="Photo" @change="handleFileUpload" required>
        </div>
  
       
  
        <div class="d-flex justify-content-end">
          <button class="btn" type="submit" @click="ajouterEmployerss" >S'inscrire</button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive } from 'vue';
import { useEmploye } from '../../service/server.js';
import { useRouter } from 'vue-router';

const router = useRouter();
const { ajouterEmploye } = useEmploye();
  const employe = reactive({
    Nom: '',
    Prenom: '',
    Naissance: '',
    Telephone: '',
    Email: '',
    Mot_De_Passe: '',
    Photo: '', // La photo sera stockée sous forme de chaîne de caractères
    RoleId: null,
    SecurSalleId: null
  });
  
  

  const soumettreEmploye = async () => {
  try {
    const resultat = await ajouterEmploye(employe);
    
    router.push('/PortailEmploye')

  } catch (error) {
  console.error("Erreur capturée:", error);

  if (error.response && error.response.data) {
    const messageErreur = error.response.data.errors || error.response.data.error;
    console.error("Message d'erreur du serveur:", messageErreur);
  } else {
    console.error("Une erreur est survenue dans le front-end");
  }
}

};


  
const handleFileUpload = event => {
  const fileReader = new FileReader();
  fileReader.readAsDataURL(event.target.files[0]);
  fileReader.onload = e => {
    employe.Photo = e.target.result;
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
  