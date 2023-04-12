# Test/Etude de cas - Alternance

## Informations utiles
- Fork le projet sur votre répertoire personnel avant de travailler sur le projet.
- Utilisation de la version node:18.15 pour l'installation des dépendances.

Libre à vous ensuite d'organiser votre espace de travail comme vous le souhaitez.

## Création d'un formulaire sous React

Vous aller créer un formulaire permettant de rentrer les données annuelles de dépenses et d’énergie d’une chaufferie. Votre formulaire comprendra une liste d’inputs pouvant être dupliqué à l’aide d’un bouton (+) pour chaque année.

Le formulaire ce décompose en deux parties, d’**un coté la nature de la production ECS** qui va déterminer les champs qui s’afficheront ou non sur la deuxième partie du formulaire.
La **deuxième partie quand à elle comprends les données par années** de dépenses et d’énergies de la chaufferie. 

Nous pouvons ajouter un **maximum de 5 années** et nous devons avoir **1 année par défaut** affichée à l’écran. Chaque année peut être supprimée individuellement.

Lorsque nous ajoutons une nouvelle année, le **type d’énergie doit être pré-populé de l’année précédente**, mais peut être modifié par l’utilisateur.

Un bouton d’enregistrement permettra de valider le formulaire (un console.log dans la fonction de soumission du formulaire permettra de vérifier l’envoie des données).

Pour la réalisation du formulaire vous utiliserez les outils qui vous conviennent, nous préconisons react-hook-form (c’est le module que nous utilisons en interne actuellement).

Pour le style(CSS) du formulaire vous pouvez utiliser ce qui vous convient (mui, style-component, scss etc...). La seule obligation est de respecter le format c’est à dire que **le label se situe à gauche et ne doit pas être répété au niveau des inputs** qui sont alignés comme sur l’exemple ci-dessous. Le formulaire ne doit pas forcément être responsive.

_Nous conseillons un background blanc et une couleur de texte gris clair._
<details><summary>Exemple en image</summary>
<img width="915" alt="Capture d’écran 2023-04-11 à 15 05 41" src="https://user-images.githubusercontent.com/130544641/231399401-f061f8ab-6c74-428a-b1a1-1339ab1e5122.png">
</details>

Liste des champs et de leurs règles:

<details><summary>Cliquez pour afficher</summary>

- Nature de la production ECS (natureOfEcsProduction)
  - Type: List(shared,separated,individual)
  - Règle: Obligatoire (seul les valeurs de la liste sont acceptés)
  - Condition d'affichage: Ce champs est unique et toujours présent

- Début de la période (startConsumptionPeriod)
  - Type: Date(format string)
  - Règle: Obligatoire (seul un format date est accepté)
  - Condition d'affichage: Toujours présent

- Fin de la période (endConsumptionPeriod)
  - Type: Date(format string)
  - Règle: Obligatoire (seul un format date est accepté)
  - Condition d'affichage: Toujours présent
 
- Type d'énergie (currentEnergy)
  - Type: List(naturalGas, oil, electricity, woodpellets)
  - Règle: Obligatoire (seul les valeurs de la liste sont acceptés)
  - Condition d'affichage: Toujours présent

- Type d'énergie Ecs (currentEnergyEcs)
  - Type: List(naturalGas, oil, electricity, woodpellets)
  - Règle: Obligatoire (seul les valeurs de la liste sont acceptés)
  - Condition d'affichage: Si nature de la production ecs est separated

- Consommation totale (totalConsumption)
  - Type: Number
  - Règle: Aucune
  - Condition d'affichage: Si nature de la production ecs est shared ou individual

- Coût énergétique total (costConsumption)
  - Type: Number
  - Règle: Aucune
  - Condition d'affichage: Si nature de la production ecs est shared ou individual

- Coût Ecs (costEcs)
  - Type: Number
  - Règle: Aucune
  - Condition d'affichage: Si nature de la production ecs est shared ou separated

- Volume Ecs (volumeEcs)
  - Type: Number
  - Règle: Aucune
  - Condition d'affichage: Si nature de la production ecs est shared ou separated

- Coût maintenance chaufferie (maintenanceCost)
  - Type: Number
  - Règle: Aucune
  - Condition d'affichage: Toujours présent

- Coût travaux chaufferie (renovationCost)
  - Type: Number
  - Règle: Aucune
  - Condition d'affichage: Toujours présent
 
- DJU (dju)
  - Type: Number
  - Règle: Obligatoire
  - Condition d'affichage: Toujours présent
</details>

## Bonus 1

Pré-populer les champs début et fin de la période de consommation lorsqu’on ajoute une année. Le début de la période suivante se situe un jour après la fin de la période de l’année courante (10/04/2024 → 11/04/2024). On ajoute une année moins un jour pour la fin de la période suivante (11/04/2024 → 10/04/2025).
<details><summary>Exemple en image</summary>
<img width="623" alt="Capture d’écran 2023-04-11 à 15 56 55" src="https://user-images.githubusercontent.com/130544641/231399994-a4dc5406-bcde-4adc-b966-ece234a84cb7.png">
</details>

## Bonus 2

Pouvoir ajouter un autre type d’énergie lorsque la nature de la production Ecs est shared ou individual. Il doit y avoir au minimum une énergie et maximum 2 énergies. Le fait d’ajouter une énergie implique de dupliquer également les champs “consommation totale” et “coût énergétique total” en fonction du nombre d’énergie.
Lorsque 2 énergies sont affichés:
- consommation totale devient consommation énergie 1 et consommation énergie 2
- coût énergétique total devient coût énergie 1 et coût énergie 2

<details><summary>Avec une énergie</summary>
<img width="524" alt="Capture d’écran 2023-04-11 à 15 47 31" src="https://user-images.githubusercontent.com/130544641/231400265-d914e551-c314-4d3b-a369-b331007e9952.png">
</details>

<details><summary>Avec deux énergies</summary>
<img width="535" alt="Capture d’écran 2023-04-11 à 15 47 48" src="https://user-images.githubusercontent.com/130544641/231400353-68558177-f4ae-40a9-8831-4d7999b4c2d5.png">
</details>
