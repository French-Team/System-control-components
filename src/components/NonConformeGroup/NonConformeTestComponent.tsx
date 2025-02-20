import React from 'react';
import './NonConformeTestComponent.styles.css';

// Ce composant est intentionnellement non conforme pour tester le système de surveillance
// Modification pour forcer une nouvelle analyse
export default function NonConformeTestComponent() {
  return (
    <div className="non-conforme-container">
      <header>Non Conforme Test entête</header>
      <button>Action Test</button>
      <section>Contenu de test</section>
      <footer>Pied de page non conforme</footer>
    </div>
  );
}
