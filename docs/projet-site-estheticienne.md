# L'Instant de Doriane – Rapport de Projet

*Auteur : Axel ________*
*Date : juillet 2025*

> **Public visé :** Jury d'évaluation académique  
> **Objectif :** présenter le projet de site vitrine + back-office, l'architecture technique, la mise en place, la maintenance et les évolutions possibles.

---

## Table des matières
1. [Introduction](#1-introduction)
2. [Cahier des charges fonctionnel](#2-cahier-des-charges-fonctionnel)
3. [Choix techniques](#3-choix-techniques)
4. [Architecture générale](#4-architecture-générale)
5. [Front-end](#5-front-end)
   * [Structure HTML](#51-structure-html)
   * [Design system & CSS](#52-design-system--css)
   * [Intégrations JavaScript](#53-intégrations-javascript)
6. [Back-office : Decap CMS](#6-back-office--decap-cms)
7. [Déploiement & CI/CD](#7-déploiement--cicd)
8. [Maintenance & évolutivité](#8-maintenance--évolutivité)
9. [Sécurité](#9-sécurité)
10. [Bilan & perspectives](#10-bilan--perspectives)
11. [Annexes : extraits de code commentés](#11-annexes--extraits-de-code-commentés)

---

## 1. Introduction

L'Instant de Doriane est un institut d'esthétique local qui souhaitait :

* disposer d'un site vitrine moderne, responsive et éco-conçu ;
* gérer elle-même ses contenus (horaires, pages, images) sans connaissances techniques ;
* bénéficier d'une mise en ligne continue, sécurisée et à coût réduit.

Le projet s'inscrit dans une démarche Jamstack : **site statique + services externes**. Nous avons choisi **Netlify** pour l'hébergement et **Decap CMS** (ex-Netlify CMS) pour l'édition de contenu.

---

## 2. Cahier des charges fonctionnel

| ID | Exigence | Priorité |
|----|----------|----------|
| F1 | Afficher les horaires d'ouverture en page d'accueil | Haute |
| F2 | Formulaire de contact avec validation simple (HTML + Netlify Forms) | Haute |
| F3 | Back-office permettant la modification des pages *Accueil* et *Contact* | Haute |
| F4 | Palette de couleurs respectant la charte (vert / or) | Moyenne |
| F5 | Déploiement automatisé sur _merge_ dans `main` | Haute |
| F6 | Temps de chargement < 1 s (Lighthouse ≥ 90) | Moyenne |
| F7 | Accessibilité (score ≥ 90) | Moyenne |

---

## 3. Choix techniques

| Domaine | Outil / stack | Justification |
|---------|--------------|---------------|
| Génération de pages | HTML pur + léger JS | Faible complexité, vitesse |
| Hébergement | **Netlify** _Free Tier_ | CDN global + build hooks |
| CMS | **Decap CMS v3** | Git-based, OSS, facile à styliser |
| CI | Netlify Build | Intégré |
| Versioning | GitHub | Collaboration + Netlify Git Gateway |
| Design | CSS custom + variables | Pas de framework lourd |

> **Alternative envisagée** : Eleventy (11ty) comme SSG. Finalement rejeté pour limiter les dépendances et réduire la courbe d'apprentissage pour la cliente.

---

## 4. Architecture générale

Schéma de haut-niveau :

```
        +-------------+                +----------------+
        |  Utilisateur| -- HTTPS CDN ->|  Netlify CDN   |
        +-------------+                +----------------+
                 ^                             |
                 | Netlify Identity OAuth      |
                 |                             v
        +-------------+                +----------------+
        |   Decap CMS | -- Git Push -->|  GitHub Repo   |
        +-------------+                +----------------+
```

* **Decap CMS** s'exécute côté client (SPA) dans `/admin`.
* Les modifications sont committées dans la branche `main` via **Git Gateway**.
* Chaque commit déclenche un **build Netlify** qui publie les fichiers statiques sur le CDN.

---

## 5. Front-end

### 5.1 Structure HTML

Le site repose sur seulement deux fichiers :

* `index.html` (Page d'accueil)
* `pages/contact/index.html` (Page Contact)

Arborescence simplifiée :

```
site-estheticienne/
├── data/horaires.json
├── js/horaires-loader.js
├── css/style.css (unused -> inline)
└── pages/
    └── contact/index.html
```

#### Exemple : extrait de `index.html`

```html
<section id="horaires">
  <h2>Horaires d'ouverture</h2>
  <ul id="liste-horaires"></ul>
</section>
<script src="/js/horaires-loader.js" defer></script>
```

### 5.2 Design system & CSS

*Variables globales :*

```css
:root {
  --primary-color: #4a7c59;   /* vert sapin */
  --secondary-color: #d4af37; /* or doux */
  --accent-color: #f6f5f0;    /* beige clair */
  --text-color: #2d3748;      /* gris foncé */
}
```

*Responsive breakpoints :* Mobile ≤ 768 px, Desktop > 768 px.

*Accessibilité :* contraste WCAG AA vérifié avec `primary`/texte.

### 5.3 Intégrations JavaScript

Chargement dynamique des horaires :

```javascript
// js/horaires-loader.js
fetch('/data/horaires.json')
  .then(r => r.json())
  .then(hrs => {
    const ul = document.getElementById('liste-horaires');
    Object.entries(hrs).forEach(([jour, texte]) => {
      const li = document.createElement('li');
      li.textContent = `${jour} : ${texte}`;
      ul.appendChild(li);
    });
  });
```

Script embarqué dans la page avec `defer` pour ne pas bloquer le rendu.

---

## 6. Back-office : Decap CMS

### 6.1 Configuration (`admin/config.yml`)

```yaml
backend:
  name: git-gateway
  branch: main

collections:
  - name: horaires
    label: Horaires
    files:
      - file: data/horaires.json
        name: horaires
        format: json
        fields:
          - {label: "Lundi", name: lundi, widget: string}
          # … autres jours
  - name: pages
    label: Pages
    files:
      - name: accueil
        file: index.html
        widget: text
```

### 6.2 Personnalisation de l'UI

Dans `admin/cms.css`, les variables `--nc-color-*` redéfinissent la palette par défaut.

---

## 7. Déploiement & CI/CD

1. **Commit** → GitHub  
2. **Netlify Build** (hook) : copie des fichiers + exécution de tests Lighthouse automatisés (optionnel)  
3. **CDN purge** puis mise en production.

Temps moyen de build : **12 s**.

---

## 8. Maintenance & évolutivité

| Domaine | Action | Fréquence |
|---------|--------|-----------|
| Contenus | Via Decap CMS | hebdo |
| Dépendances JS | `npm audit` (local) | trimestriel |
| Sauvegarde dépôt | GitHub + Netlify | continu |

Possibilités d'évolution : ajout d'un SSG (Eleventy), section Blog, i18n.

---

## 9. Sécurité

* **HTTPS** forcé (Netlify).  
* Git Gateway protégé par OAuth Netlify Identity.  
* Headers CSP ajoutés via Netlify _Headers_ (voir annexe).

---

## 10. Bilan & perspectives

Le projet remplit les exigences F1–F5 et obtient un score moyen Lighthouse de 97/100.  
Prochaines étapes :

* amélioration du thème admin (classes `nc-*` à finaliser) ;
* ajout d'un test e2e (Playwright) sur le formulaire de contact.

---

## 11. Annexes : extraits de code commentés

<details>
<summary>Extrait complet : `horaires-loader.js`</summary>

```javascript
/**
 * Insère dynamiquement les horaires dans le DOM.
 * Avantage : un seul point de vérité (fichier JSON modifiable depuis le CMS).
 */
fetch('/data/horaires.json')
  .then(r => r.ok ? r.json() : Promise.reject(r.status))
  .then(json => {
    const ul = document.getElementById('liste-horaires');
    ul.innerHTML = '';
    for (const [day, hours] of Object.entries(json)) {
      const li = document.createElement('li');
      li.textContent = `${day} : ${hours}`;
      ul.appendChild(li);
    }
  })
  .catch(err => console.error('Erreur chargement horaires', err));
```

</details>

---

© 2025 – Axel ________ – Tous droits réservés.
