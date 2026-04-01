import type { AccessoryItem } from '../types/accessory';

export function renderWithPlacement(item: AccessoryItem | undefined) {
  if (!item?.render) return null;
  const placement = item.placement ?? { x: 0, y: 0, scale: 0.05, rotate: 0 };
  return (
    <g transform={`translate(${placement.x} ${placement.y}) rotate(${placement.rotate}) scale(${placement.scale})`}>
      {item.render}
    </g>
  );
}
