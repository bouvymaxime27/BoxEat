
#!/bin/bash

echo "📊 BoxEat - Extraction des erreurs pour diagnostic"
echo "=================================================="

OUTPUT_FILE="expo-errors.txt"

echo "📝 Création du fichier de diagnostic: $OUTPUT_FILE"
echo "" > $OUTPUT_FILE

echo "=== INFORMATIONS SYSTÈME ===" >> $OUTPUT_FILE
echo "Date: $(date)" >> $OUTPUT_FILE
echo "Node version: $(node -v)" >> $OUTPUT_FILE
echo "NPM version: $(npm -v)" >> $OUTPUT_FILE
echo "" >> $OUTPUT_FILE

echo "=== DÉPENDANCES EXPO ===" >> $OUTPUT_FILE
npx expo --version >> $OUTPUT_FILE 2>&1
echo "" >> $OUTPUT_FILE

echo "=== DIAGNOSTIC EXPO ===" >> $OUTPUT_FILE
npx expo doctor >> $OUTPUT_FILE 2>&1
echo "" >> $OUTPUT_FILE

echo "=== STRUCTURE DU PROJET ===" >> $OUTPUT_FILE
ls -la >> $OUTPUT_FILE 2>&1
echo "" >> $OUTPUT_FILE

echo "=== PACKAGE.JSON ===" >> $OUTPUT_FILE
cat package.json >> $OUTPUT_FILE 2>&1
echo "" >> $OUTPUT_FILE

echo "✅ Fichier créé: $OUTPUT_FILE"
echo ""
echo "📋 Instructions pour ChatGPT:"
echo "1. Ouvrez le fichier $OUTPUT_FILE"
echo "2. Copiez tout le contenu"
echo "3. Envoyez à ChatGPT avec ce message:"
echo ""
echo "   'Voici le diagnostic complet de mon projet BoxEat Expo SDK 54."
echo "   Analyse les erreurs et propose des solutions spécifiques:'"
echo "   [COLLEZ LE CONTENU DE expo-errors.txt ICI]"
