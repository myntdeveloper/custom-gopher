import type { AccessoryItem } from '../types/accessory';

export const GLASSES: AccessoryItem[] = [
  {
    id: 'glasses_v2',
    name: 'Glasses',
    placement: { x: 1.0, y: -0.5, scale: 1.02, rotate: 0 },
    preview: (
      <svg viewBox="0 0 64 64" className="mini-svg">
        <circle cx="20" cy="32" r="10" stroke="black" strokeWidth="3" fill="none" />
        <circle cx="44" cy="32" r="10" stroke="black" strokeWidth="3" fill="none" />
        <rect x="28" y="30" width="8" height="4" fill="black" />
      </svg>
    ),
    render: (
      <g>
        <circle cx="11.2" cy="6.6" r="2.4" stroke="#111" strokeWidth="0.6" fill="none" />
        <circle cx="17.6" cy="6.4" r="2.4" stroke="#111" strokeWidth="0.6" fill="none" />
        <rect x="13.6" y="6.2" width="1.6" height="0.5" fill="#111" />
      </g>
    ),
  },
];

export const HEADWEAR: AccessoryItem[] = [
  {
    id: 'top_hat_v2',
    name: 'Top Hat',
    placement: { x: -0.2, y: -2.5, scale: 1, rotate: 0 },
    preview: (
      <svg viewBox="0 0 64 64" className="mini-svg">
        <ellipse cx="32" cy="46" rx="20" ry="4" fill="#111" />
        <rect x="18" y="18" width="28" height="28" rx="4" fill="#111" />
        <rect x="18" y="30" width="28" height="6" fill="#444" />
      </svg>
    ),
    render: (
      <g>
        <ellipse cx="16" cy="4.6" rx="6" ry="1.2" fill="#111" />
        <rect x="11.5" y="0.8" width="9" height="4.2" rx="1.2" fill="#111" />
        <rect x="11.5" y="2.6" width="9" height="0.9" fill="#444" />
      </g>
    ),
  },
];

export const NECKWEAR: AccessoryItem[] = [
  {
    id: 'tie_v2',
    name: 'Tie',
    placement: { x: 0, y: 3.2, scale: 1, rotate: 0 },
    preview: (
      <svg viewBox="0 0 64 64" className="mini-svg">
        <polygon points="32,12 24,22 40,22" fill="#d32f2f" />
        <polygon points="24,22 40,22 34,52 30,52" fill="#f44336" />
      </svg>
    ),
    render: (
      <g>
        <polygon points="16,10 14.8,11.8 17.2,11.8" fill="#c62828" />
        <polygon points="14.8,11.8 17.2,11.8 16.6,20 15.4,20" fill="#e53935" />
      </g>
    ),
  },
];
