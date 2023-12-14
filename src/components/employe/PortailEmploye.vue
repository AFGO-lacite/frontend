<template>
    <div ><div class="d-flex justify-content-center p-5  "><p class="text-white h1 d-flex justify-content-center p5 texts ">Portail Employé</p></div>
        

        <nav v-if="route.path == '/PortailEmploye'" class="container  d-flex justify-content-center mt-4   text-dark   rounded  ">
            <RouterLink to="/connecterEmploye" class=" mart  h3  m-4 nav-link oo"><p class="text-white shadow ">Se connecter</p></RouterLink>
            <RouterLink to="/enregistrerEmploye" class="mart  h3 m-4 nav-link oo"><p class="text-white shadow" >S'enregistrer</p></RouterLink>
        </nav>
        <RouterView/></div>
        
    
        
    
</template>

<script setup>
    import { RouterLink, RouterView, useRoute } from 'vue-router';

const route = useRoute(); 
</script>

<style  scoped>

.oo{
  font-size: 25px;
}
.texts{ font-size: 48px;}
.mart{padding-top: 150px;}

</style>