# Stitchly — studio de broderie en ligne

Application web pour une activité de broderie : le client conçoit son design, voit le rendu point par point, obtient un devis instantané et passe commande. L'atelier suit les commandes et télécharge les fiches de production.

**En ligne :** https://brahim903-d.github.io/mchrou3eclaude/

## Fonctionnalités

- **Studio** : texte (5 polices, taille, espacement), 5 formes, modèles prêts, import de logo (PNG/JPG/SVG ≤ 2 Mo), glisser-déposer, rotation, échelle, calques, annuler/rétablir, raccourcis clavier.
- **Articles** : t-shirt, hoodie, casquette, tote bag, 7 couleurs, emplacements (poitrine, cœur, dos, face, côté) avec zone de cerceau.
- **Broderie** : 16 fils, 3 types de point (satin, remplissage, contour), rendu « relief » des points, alertes (hors zone, texte trop petit, > 12 couleurs).
- **Devis** : estimation des points et du temps machine, prix par 1 000 points, changements de couleur, digitalisation, remises de quantité (5+, 12+, 50+).
- **Exports** : SVG, PNG haute résolution, fiche de production JSON (séquence des fils, points par élément).
- **Mes designs**, **Panier** (taille, quantité, livraison offerte dès 500 DH), **Commande** (validation téléphone marocain, paiement à la livraison ou virement), **Suivi** (reçue → digitalisation → production → expédiée → livrée).

Les données sont stockées dans le navigateur (localStorage).

## Développement

```bash
npm install
npm run dev        # serveur local
npm test           # tests Playwright (desktop + mobile)
npm run build      # build de production dans dist/
```

Tarifs : `src/pricing.js` · Articles, fils, polices : `src/catalog.js`.

## Déploiement

Chaque push sur `main` lance les tests puis publie sur GitHub Pages (`.github/workflows/deploy.yml`).
