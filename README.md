# Application de Remplissage Automatique OTP

Cette application est un POC (Proof of Concept) développé pour démontrer le remplissage automatique d'un input avec un code OTP (One Time Password). Elle est spécialement conçue pour les développeurs et les applications nécessitant une authentification OTP, offrant ainsi une expérience utilisateur améliorée en simplifiant le processus de saisie des codes.

## Fonctionnalités

- **Remplissage Automatique :** Détecte et remplit automatiquement l'input avec le code OTP reçu.
- **Compatibilité :** Fonctionne sur Android grâce à React Native et Expo.
- **Sécurité :** Conçu en gardant à l'esprit les meilleures pratiques de sécurité pour les applications nécessitant une authentification forte.

## Technologies Utilisées

- React Native
- Expo

## Démarrage rapide

Pour exécuter cette application sur votre machine locale, suivez les étapes ci-dessous :

1. **Cloner le dépôt :**

```bash
git clone https://github.com/diamondrarktvo/testOtp.git
cd testOtp
yarn install
```

2. **Supprimer eas.json et app.json**
3. **Assurer vous d'avoir un compte expo dans expo.dev**
4. **Lancer les commandes suivantes :**
   
```bash
eas login
eas init
eas build:configure
eas build --platform android --profile development || eas build --platform android --profile preview
```

5. **Telecharger le build**
6. **Si vous avez lancé le build de "developpement", alors lancer votre métro dans le terminal où se trouve le package.json : **
   ```bash
yarn start
```
