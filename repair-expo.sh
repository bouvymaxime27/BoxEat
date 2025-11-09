
#!/bin/bash

echo "🔧 BoxEat - Script de réparation automatique Expo SDK 54"
echo "========================================================="

# 1. Nettoyage complet
echo "1️⃣ Nettoyage des caches et modules..."
rm -rf node_modules package-lock.json .expo node_modules/.cache
echo "✅ Nettoyage terminé"

# 2. Réinstallation des dépendances
echo "2️⃣ Réinstallation des dépendances..."
npm install
echo "✅ Dépendances installées"

# 3. Vérification de Node.js
echo "3️⃣ Vérification de la version Node.js..."
NODE_VERSION=$(node -v)
echo "Node version: $NODE_VERSION"

if [[ "$NODE_VERSION" == v20* ]]; then
  echo "✅ Node 20 détecté"
else
  echo "⚠️  Attention: Node $NODE_VERSION détecté (recommandé: v20.x)"
fi

# 4. Vérification Expo
echo "4️⃣ Vérification Expo CLI..."
npx expo --version
echo "✅ Expo CLI OK"

# 5. Diagnostic des erreurs
echo "5️⃣ Lancement du diagnostic..."
npx expo doctor
echo "✅ Diagnostic terminé"

echo ""
echo "🎉 Réparation terminée! Vous pouvez maintenant lancer:"
echo "   npm start"
echo ""
echo "📋 Pour voir les erreurs détaillées, copiez-collez ceci à ChatGPT:"
echo "   'Voici les erreurs de mon projet Expo SDK 54: [COLLEZ LA SORTIE CONSOLE ICI]'"
