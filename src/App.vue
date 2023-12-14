<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router';

const route = useRoute(); 
</script>

<template>
  <body class="pt-5">
    <header class="container-fluid bg-dark justify-content-center"><h1 class="text-center text-warning">AFGO LOCATION</h1></header>
    <main class="container-fluid  ">
      <div v-if="route.path == '/'" id="div1" class="d-flex justify-content-center p-5  "><p id="acc" class="text-white h1 d-flex justify-content-center p5 texts ">Accueil</p></div>
      <nav v-if="route.path == '/'" class="container  d-flex justify-content-center mt-4   text-dark   rounded  " >
        <RouterLink to="/portailClient" class=" mart  h3  m-4 nav-link oo"><p class="text-white shadow ">Client</p></RouterLink>
        <RouterLink to="/PortailEmploye" class="mart  h3 m-4 nav-link oo"><p class="text-white shadow" >Employé</p></RouterLink>
      </nav>

      <RouterView />
    </main>
   <footer class="align-bottom bg-dark"><p id="foot" class="text-center text-warning">AFGO copyright &copy</p></footer>
  </body>
</template>

<style scoped>
header{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%; 
  display: flex; 
  justify-content: center; 
  align-items: center; 
  text-align: center;
  margin-bottom:-55px ;
}

.oo{
  font-size: 35px;
}
.texts{ font-size: 65px;}
.mart{padding-top: 150px;}
body{
  display: flex;
  background-image: linear-gradient(to bottom, #6B5B95, #9D94C1);
}
footer{
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%; 
  display: flex; 
  justify-content: center; 
  align-items: center; 
  text-align: center;
  margin-top: 5rem;
  z-index: 0;
}
main{
  padding-bottom: 5rem;
  width: 100%;

  
 
}

</style>
