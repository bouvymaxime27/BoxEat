
#!/bin/bash
# Formule de réparation automatique BoxEat
rm -rf node_modules package-lock.json .expo node_modules/.cache && npm install && npx expo start --tunnel --clear
