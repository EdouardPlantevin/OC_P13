# PoC - Chat Support (Your Car Your Way)

Ce projet est une **Preuve de Concept (PoC)** visant à valider la faisabilité technique de la fonctionnalité de chat en temps réel pour le service client de *Your Car Your Way*.

Il démontre la communication bidirectionnelle entre un client Angular et un backend Spring Boot via **WebSockets (STOMP)**.

## 🚀 Prérequis

* **Docker** et **Docker Compose** doivent être installés sur votre machine.
* Aucune installation de Java ou Node.js n'est requise en local (tout tourne dans les conteneurs).

## 🛠️ Installation et Lancement

1. **Cloner le dépôt** (ou télécharger les sources) :
```bash
git clone https://github.com/EdouardPlantevin/OC_P13.git
cd ycyw-chat-poc
```


2. **Lancer l'application** :
Utilisez Docker Compose pour construire et démarrer les services (Frontend et Backend).
```bash
docker-compose up --build
```


*Note : L'option `--build` assure que le code Java est bien recompile à chaque lancement.*

## 📋 Données de test

Les données de test (utilisateurs Edouard et Adèle, tables `users` et `customer_profiles`) sont chargées automatiquement au **premier démarrage** via le script `db/init.sql`.

Pour **réinitialiser** la base et recharger les données de test, exécuter :

```bash
docker-compose down -v
docker-compose up --build
```

L’option `-v` supprime les volumes (dont la base MySQL), ce qui force la réexécution du script d’initialisation au prochain démarrage.

## 🏗️ Architecture Technique

* **Frontend :** Angular (Client SPA)
* **Backend :** Spring Boot 3 (Java 21) + `spring-boot-starter-websocket`.
* **Infrastructure :** Conteneurisation complète via Docker (Multi-stage build).