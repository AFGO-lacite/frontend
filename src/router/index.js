import { createRouter, createWebHistory } from 'vue-router'
import enregistrerClient from '../components/client/enregistrerClient.vue'
import PortailClient from '../components/client/PortailClient.vue'
import conectClient from '../components/client/connecterClient.vue'
import PortailEmploy from '../components/employe/PortailEmploye.vue'
import conectEmploy from '../components/employe/connecterEmploye.vue'
import enregistrerEmploy from '../components/employe/enregistrerEmploye.vue'
import ListeEmployes from '../components/employe/EmployeListes.vue'
import BoardEmploye from '../components/employe/boardEmploye.vue'
import ListeRole from '../components/role/RoleListe.vue'
import ListeGarage from '../components/garage/GarageListe.vue'
import ListeParking from '../components/Parking/ParkingListe.vue'
import ListeSeccurSalle from '../components/Seccursale/SecurSalleListe.vue'
import ListeVoiture from '../components/voiture/VoitureListe.vue'
import ListeMaintenance from '../components/Maintenance/MaintenanceListe.vue'
import ListeClient from '../components/client/ClientListe.vue'
import ListeReservation from '../components/Reservation/ReservationListe.vue'
import ListeReservationClient from '../components/client/ReservationClientListe.vue'
import ajout from '../components/client/ajouter.vue'
import home from '../App.vue'
const routeOuvertes = ['portailClient', 'Se connecter', 'enregistrerClient','enregistrerEmploye','connecterEmploye','PortailEmploye'  ]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      
     
    },
    {
      path: '/portailClient',
      name: 'portailClient',
      component:PortailClient
     
    },
  
    {
      path: '/Se connecter',
      name: 'Se connecter',
      component:conectClient
      
    },
    {
      path: '/enregistrerClient',
      name: 'enregistrerClient',
      component:enregistrerClient
      
    },
    {
      path: '/enregistrerEmploye',
      name: 'enregistrerEmploye',
      component:enregistrerEmploy
     
    },
    {
      path: '/PortailEmploye',
      name: 'PortailEmploye',
      component:PortailEmploy
      
    },
    {
      path: '/connecterEmploye',
      name: 'connecterEmploye',
      component:conectEmploy
      
    },

    {
      path: '/ListeEmploye',
      name: 'ListeEmploye',
      component:ListeEmployes
      
    },

    {
      path: '/BoardEmploye',
      name: 'BoardEmploye',
      component:BoardEmploye
      
    },

    {
      path: '/ListeRole',
      name: 'ListeRole',
      component:ListeRole
      
    },

    {
      path: '/ListeGarage',
      name: 'ListeGarage',
      component:ListeGarage
      
    },


    {
      path: '/ListeParking',
      name: 'ListeParking',
      component:ListeParking
      
    },
    {
      path: '/ListeSecursalle',
      name: 'LListeSecursalle',
      component:ListeSeccurSalle
      
    },
    {
      path: '/ListeVoiture',
      name: 'ListeVoiture',
      component:ListeVoiture
      
    },
    {
      path: '/ListeMaintenance',
      name: 'ListeMaintenance',
      component:ListeMaintenance
      
    },
    {
      path: '/ListeClient',
      name: 'ListeClient',
      component:ListeClient
    
    },
    {
      path: '/ListeReservation',
      name: 'ListeReservation',
      component:ListeReservation
      
    },

    {
      path: '/reservationclient',
      name: 'reservationclient',
      component:ListeReservationClient
      
    },

    {
      path: '/ajouter',
      name: 'ajouter',
      component:ajout
      
    },

    
    



  ]
})

export default router



function estConnecte() {
  
  const currentUrl = window.location.href;
  
  
  const allowedDomain = 'http://localhost:5173/';


  if (currentUrl.startsWith(allowedDomain)) {
    var tokenClient = localStorage.getItem('clientToken');
    var tokenEmploye = localStorage.getItem('employeeToken');
    return tokenClient || tokenEmploye;
  } else {
    return false;
  }
}



router.beforeEach((to, from, next) => {
  
  if (!routeOuvertes.includes(to.name.toLocaleLowerCase()) || !estConnecte()) {
    next();
  } else {
  
    next('/'); 
  }
});

