import { defineStore } from "pinia"
import { computed, ref } from "vue"
import { useRouter } from "vue-router"
const useAuthStore = defineStore('auth', () => {
    // Donnees dont nous avons besoin apres la connexion
    const user = ref({})
    
    const router = useRouter()

    //Les fonctions qui permettent de mettre a jour les valeurs des variables precedentes
    // Appelees setters

    const setUser = currentUser => {
        user.value = currentUser
    }

    

    const logout = () => {
        user.value = null
        
        router.push('/')

    }

    //Les fonctions qui retournent la valeur courante
    // computed permet de relire seulement s'il y'a une modification
    const loggedInUser = computed(() => user.value)
   

    return { user, setUser, loggedInUser, logout }
},
    {
        persist: true
    }
)

export default useAuthStore