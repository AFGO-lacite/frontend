import axios from 'axios'



const useClient = () => {
    // Lister tous les Clients
    const listerClients = async () => {
        const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/client`);
        return result.data;
    };

    // Ajouter un Client
    const ajouterClient = async (clientData) => {
        const result = await axios.post(`${import.meta.env.VITE_BASE_URL}/client`, clientData);
        return result.data;
    };

    // Modifier un Client
    const modifierClient = async (id, clientData) => {
        const result = await axios.put(`${import.meta.env.VITE_BASE_URL}/client/${id}`, clientData);
        return result.data;
    };

    // Récupérer un Client par son ID
    const recupererClient = async (id) => {
        const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/client/${id}`);
        return result.data;
    };

    // Supprimer un Client
    const supprimerClient = async (id) => {
        const result = await axios.delete(`${import.meta.env.VITE_BASE_URL}/client/${id}`);
        return result.data;
    };

    return { listerClients, ajouterClient, modifierClient, recupererClient, supprimerClient };
};



const useEmploye = () => {
    // Lister tous les Employes
    const listerEmployes = async () => {
        const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/employe`);
        return result.data;
    };

    // Ajouter un Employe
    const ajouterEmploye = async (employeData) => {
        const result = await axios.post(`${import.meta.env.VITE_BASE_URL}/employe`, employeData);
        return result.data.data;
    };

    // Modifier un Employe
    const modifierEmploye = async (id, employeData) => {
        const result = await axios.put(`${import.meta.env.VITE_BASE_URL}/employe/${id}`, employeData);
        return result.data;
    };

    // Récupérer un Employe par son ID
    const recupererEmploye = async (id) => {
        const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/employe/${id}`);
        return result.data;
    };

    // Supprimer un Employe
    const supprimerEmploye = async (id) => {
        const result = await axios.delete(`${import.meta.env.VITE_BASE_URL}/employe/${id}`);
        return result.data;
    };
    const modifierPartiellementEmploye = async (id, employeData) => {
        const result = await axios.patch(`${import.meta.env.VITE_BASE_URL}/employe/${id}`, employeData);
        return result.data;
    };

    return { listerEmployes, ajouterEmploye, modifierEmploye, recupererEmploye, supprimerEmploye, modifierPartiellementEmploye };

};



const useGarageDeMaintenance = () => {
    // Lister tous les Garages de Maintenance
    const listerGarages = async () => {
        const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/garage`);
        return result.data;
    };

    // Ajouter un Garage de Maintenance
    const ajouterGarage = async (garageData) => {
        const result = await axios.post(`${import.meta.env.VITE_BASE_URL}/garage`, garageData);
        return result.data;
    };

    // Modifier un Garage de Maintenance
    const modifierGarage = async (id, garageData) => {
        const result = await axios.put(`${import.meta.env.VITE_BASE_URL}/garage/${id}`, garageData);
        return result.data;
    };

    // Récupérer un Garage de Maintenance par son ID
    const recupererGarage = async (id) => {
        const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/garage/${id}`);
        return result.data;
    };

    // Supprimer un Garage de Maintenance
    const supprimerGarage = async (id) => {
        const result = await axios.delete(`${import.meta.env.VITE_BASE_URL}/garage/${id}`);
        return result.data;
    };

    return { listerGarages, ajouterGarage, modifierGarage, recupererGarage, supprimerGarage };
};



const useLivraison = () => {
    // Lister toutes les Livraisons
    const listerLivraisons = async () => {
        const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/livraisons`);
        return result.data;
    };

    // Ajouter une Livraison
    const ajouterLivraison = async (livraisonData) => {
        const result = await axios.post(`${import.meta.env.VITE_BASE_URL}/livraisons`, livraisonData);
        return result.data;
    };

    // Modifier une Livraison
    const modifierLivraison = async (id, livraisonData) => {
        const result = await axios.put(`${import.meta.env.VITE_BASE_URL}/livraisons/${id}`, livraisonData);
        return result.data;
    };

    // Récupérer une Livraison par son ID
    const recupererLivraison = async (id) => {
        const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/livraisons/${id}`);
        return result.data;
    };

    // Supprimer une Livraison
    const supprimerLivraison = async (id) => {
        const result = await axios.delete(`${import.meta.env.VITE_BASE_URL}/livraisons/${id}`);
        return result.data;
    };

    return { listerLivraisons, ajouterLivraison, modifierLivraison, recupererLivraison, supprimerLivraison };
};


const useMaintenance = () => {
    // Lister toutes les Maintenances
    const listerMaintenances = async () => {
        const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/maintenance`);
        return result.data;
    };

    // Ajouter une Maintenance
    const ajouterMaintenance = async (maintenanceData) => {
        const result = await axios.post(`${import.meta.env.VITE_BASE_URL}/maintenance`, maintenanceData);
        return result.data;
    };

    // Modifier une Maintenance
    const modifierMaintenance = async (id, maintenanceData) => {
        const result = await axios.put(`${import.meta.env.VITE_BASE_URL}/maintenance/${id}`, maintenanceData);
        return result.data;
    };

    // Récupérer une Maintenance par son ID
    const recupererMaintenance = async (id) => {
        const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/maintenance/${id}`);
        return result.data;
    };

    // Supprimer une Maintenance
    const supprimerMaintenance = async (id) => {
        const result = await axios.delete(`${import.meta.env.VITE_BASE_URL}/maintenance/${id}`);
        return result.data;
    };

    return { listerMaintenances, ajouterMaintenance, modifierMaintenance, recupererMaintenance, supprimerMaintenance };
};




const useParking = () => {
    // Lister tous les Parkings
    const listerParkings = async () => {
        const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/parking`);
        return result.data;
    };

    // Ajouter un Parking
    const ajouterParking = async (parkingData) => {
        const result = await axios.post(`${import.meta.env.VITE_BASE_URL}/parking`, parkingData);
        return result.data;
    };

    // Modifier un Parking
    const modifierParking = async (couleurDuParking, parkingData) => {
        const result = await axios.put(`${import.meta.env.VITE_BASE_URL}/parking/${couleurDuParking}`, parkingData);
        return result.data;
    };

    // Récupérer un Parking par sa couleur
    const recupererParking = async (couleurDuParking) => {
        const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/parking/${couleurDuParking}`);
        return result.data;
    };

    // Supprimer un Parking
    const supprimerParking = async (couleurDuParking) => {
        const result = await axios.delete(`${import.meta.env.VITE_BASE_URL}/parking/${couleurDuParking}`);
        return result.data;
    };

    return { listerParkings, ajouterParking, modifierParking, recupererParking, supprimerParking };
};




const useReservation = () => {
    // Liste des Réservations avec Détails Client et Voiture
    const listeReservations = async () => {
        const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/reservation`);
        return result.data;
    };

    // Ajout d'une Réservation
    const ajoutReservation = async (reservationData) => {
        const result = await axios.post(`${import.meta.env.VITE_BASE_URL}/reservation`, reservationData);
        return result.data;
    };

    // Modification d'une Réservation
    const modifierReservation = async (id, reservationData) => {
        const result = await axios.put(`${import.meta.env.VITE_BASE_URL}/reservation/${id}`, reservationData);
        return result.data;
    };

    // Réservation par ID avec Détails Client et Voiture
    const reservationParId = async (id) => {
        const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/reservation/${id}`);
        return result.data;
    };

    // Suppression d'une Réservation
    const supprimerReservation = async (id) => {
        const result = await axios.delete(`${import.meta.env.VITE_BASE_URL}/reservation/${id}`);
        return result.data;
    };

    const listereservationsParClientId = async (clientId) => {
        const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/special/${clientId}`);
        return result.data;
    };

    return { listeReservations, ajoutReservation, modifierReservation, reservationParId, supprimerReservation, listereservationsParClientId };
};



const useRole = () => {
    // Lister tous les Roles
    const listerRoles = async () => {
        const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/role`);
        return result.data;
    };

    // Ajouter un Role
    const ajouterRole = async (roleData) => {
        const result = await axios.post(`${import.meta.env.VITE_BASE_URL}/role`, roleData);
        return result.data;
    };

    // Modifier un Role
    const modifierRole = async (id, roleData) => {
        const result = await axios.put(`${import.meta.env.VITE_BASE_URL}/role/${id}`, roleData);
        return result.data;
    };

    // Récupérer un Role par son ID
    const recupererRole = async (id) => {
        const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/role/${id}`);
        return result.data;
    };

    // Supprimer un Role
    const supprimerRole = async (id) => {
        const result = await axios.delete(`${import.meta.env.VITE_BASE_URL}/role/${id}`);
        return result.data;
    };

    return { listerRoles, ajouterRole, modifierRole, recupererRole, supprimerRole };
};




const useSecurSalle = () => {
    // Lister toutes les SecurSalles
    const listerSecurSalles = async () => {
        const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/seccursalle`);
        return result.data;
    };

    // Ajouter une SecurSalle
    const ajouterSecurSalle = async (securSalleData) => {
        const result = await axios.post(`${import.meta.env.VITE_BASE_URL}/seccursalle`, securSalleData);
        return result.data;
    };

    // Modifier une SecurSalle
    const modifierSecurSalle = async (id, securSalleData) => {
        const result = await axios.put(`${import.meta.env.VITE_BASE_URL}/seccursalle/${id}`, securSalleData);
        return result.data;
    };

    // Récupérer une SecurSalle par son ID
    const recupererSecurSalle = async (id) => {
        const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/seccursalle/${id}`);
        return result.data;
    };

    // Supprimer une SecurSalle
    const supprimerSecurSalle = async (id) => {
        const result = await axios.delete(`${import.meta.env.VITE_BASE_URL}/seccursalle/${id}`);
        return result.data;
    };

    return { listerSecurSalles, ajouterSecurSalle, modifierSecurSalle, recupererSecurSalle, supprimerSecurSalle };
};




const useVoiture = () => {
    // Liste des voitures avec détails de parking et de SecurSalle
    const listeVoiture = async () => {
        const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/voiture`);
        return result.data;
    };

    // Ajout d'une voiture
    const ajoutVoiture = async (voitureData) => {
        const result = await axios.post(`${import.meta.env.VITE_BASE_URL}/voiture`, voitureData);
        return result.data;
    };

    // Modification d'une voiture
    const modifierVoiture = async (id, voitureData) => {
        const result = await axios.put(`${import.meta.env.VITE_BASE_URL}/voiture/${id}`, voitureData);
        return result.data;
    };

    // Récupération d'une voiture par ID avec détails de parking et de SecurSalle
    const voitureParId = async (id) => {
        const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/voiture/${id}`);
        return result.data;
    };

    // Suppression d'une voiture
    const supprimerVoiture = async (id) => {
        const result = await axios.delete(`${import.meta.env.VITE_BASE_URL}/voiture/${id}`);
        return result.data;
    };

    return { listeVoiture, ajoutVoiture, modifierVoiture, voitureParId, supprimerVoiture };
};



const loginCliente = async (email, motDePasse) => {
    try {
        // Creating the payload for the login request
        const loginData = { email, motDePasse };

        // Sending a POST request to the backend API endpoint for login
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/login/client`, loginData);

        // The response should contain the user data and the token upon successful login
        if (response.status === 200) {
            const { data, token } = response.data;

            // You can now store the token in localStorage/sessionStorage or in a global state (like Vuex)
            // For example: localStorage.setItem('token', token);

            // Return the user data and token
            return { data, token };
        } else {
            // Handle unsuccessful login attempts
            throw new Error('Login failed');
        }
    } catch (error) {
        // Handle any errors during the login process
        console.error('Login error:', error.message);
        throw error;
    }
};





const loginEmploye = async (email, motDePasse) => {
    try {
        // Préparation des données de connexion
        const loginData = { Email: email, Mot_De_Passe: motDePasse };

        // Envoi d'une requête POST au backend pour la connexion de l'employé
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/logines/employe`, loginData);

        // Lors d'une connexion réussie, la réponse devrait contenir les données de l'employé et un token
        if (response.status === 200) {
            const { data, token } = response.data;

            // Vous pourriez vouloir stocker le token dans localStorage ou sessionStorage pour la gestion de la session
            // Exemple : localStorage.setItem('employeeToken', token);

            // Renvoyer les données de l'employé et le token
            return { data, token };
        } else {
            // Gestion des tentatives de connexion infructueuses
            throw new Error('La connexion a échoué');
        }
    } catch (error) {
        // Gestion des erreurs survenues lors du processus de connexion
        console.error('Erreur de connexion pour l\'employé:', error);
        throw error;
    }
};
export {
    loginEmploye,
    loginCliente,
    useVoiture,
    useSecurSalle,
    useRole,
    useReservation,
    useParking,
    useMaintenance,
    useLivraison,
    useGarageDeMaintenance,
    useEmploye,
    useClient
};
