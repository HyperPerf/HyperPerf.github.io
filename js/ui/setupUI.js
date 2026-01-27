import { DOCTRINES } from '../doctrines.js';
import { hexToRgb, createElement } from '../utils.js';

export function renderDoctrineChoice(containerId, onSelect) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    Object.entries(DOCTRINES).forEach(([key, doctrine]) => {
        const card = createElement('div', 'doctrine-card', `
            <h3>${doctrine.icon} ${doctrine.name}</h3>
            <p>${doctrine.description || ''}</p>
            <p><em>${doctrine.quote || ''}</em></p>
        `);
        card.setAttribute('data-doctrine', key);
        card.style.borderTop = `3px solid ${doctrine.color}`;
        card.addEventListener('click', () => onSelect(key, card));
        container.appendChild(card);
    });
}

export function highlightDoctrineCard(card, doctrineKey) {
    const doctrine = DOCTRINES[doctrineKey];
    card.style.borderColor = doctrine.color;
    card.style.boxShadow = `0 0 25px rgba(${hexToRgb(doctrine.color)}, 0.7)`;
}
