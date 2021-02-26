import "./ListeProduits.scss";
import Produit from "./Produit";
import tabProduits from "./data/produits.json";
import instanceFirebase from 'firebase/app';
import "firebase/firestore";

// Code pour intégrer Firebase temporairement placé ici
// Tout ce code sera organisé adéquatement dans des fichiers/hooks séparés

// Étape 1 : Objet de configuration pour utiliser les produits FB
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

// Étape 2 : Obtenir une instance de l'API Firebase
if(!instanceFirebase.apps.length) {
  instanceFirebase.initializeApp(firebaseConfig);
}

// Étape 3 : Obtenir une instance de la BD Firestore.
const bd = instanceFirebase.firestore();

// Étape 4 : Quelques exemples d'écriture et de lecture de données

// Exemple 1 : ajouter tous les produits du fichiers JSON dans la collection "produits" sur Firestore.
tabProduits.forEach(
  prd => {
    let refObjAjoute = bd.collection("produits").add(prd).then(
      refDoc => console.log("Le document est ajouté avec Identifiant : ", refDoc.id)
    )
  }
);

// Exemple 2 : Chercher des documents dans une collection
bd.collection("produits").where("prix", ">", 15).get().then(
  reponse =>  reponse.forEach(
    article => console.log("Produit plus cher que 15$ : ", article.data())
  )
);

// Exemple 3 : Observer une collection
// Pas le bon cas d'utilisation évidement, mais juste pour montrer la fonctionnalité
bd.collection("produits").onSnapshot(
  snapshot => snapshot.docChanges().forEach(
    changement => {
      if(changement.type == "added") {
        console.log(changement.doc.data());
      }
    }
  )
)

function ListeProduits(props) {
  //console.log("Panier dans ListeProduits", props.etatPanier);
  return (
    <div className="ListeProduits">
      <h2>Produits disponibles</h2>
      <ul>
        {tabProduits.map((prd) => (
          <Produit
            key={prd.id}
            etatPanier={props.etatPanier}
            id={prd.id}
            nom={prd.nom}
            prix={prd.prix}
          />
        ))}
      </ul>
    </div>
  );
}

export default ListeProduits;
