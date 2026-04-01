import { useEffect, useRef } from 'react';
import type { AccessoryItem } from '../types/accessory';

type Props = {
  title: string;
  items: AccessoryItem[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
};

export function AccessoryRow({ title, items, selectedId, onSelect }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    const mouseDownHandler = (e: MouseEvent) => {
      isDragging.current = true;
      startX.current = e.pageX - scrollEl.offsetLeft;
      scrollLeft.current = scrollEl.scrollLeft;
      scrollEl.style.cursor = 'grabbing';
      scrollEl.style.userSelect = 'none';
    };
    const mouseLeaveHandler = () => {
      isDragging.current = false;
      scrollEl.style.cursor = '';
      scrollEl.style.userSelect = '';
    };
    const mouseUpHandler = () => {
      isDragging.current = false;
      scrollEl.style.cursor = '';
      scrollEl.style.userSelect = '';
    };
    const mouseMoveHandler = (e: MouseEvent) => {
      if (!isDragging.current) return;
      e.preventDefault();
      const x = e.pageX - scrollEl.offsetLeft;
      const walk = x - startX.current;
      scrollEl.scrollLeft = scrollLeft.current - walk;
    };

    const touchStartHandler = (e: TouchEvent) => {
      isDragging.current = true;
      startX.current = e.touches[0].pageX - scrollEl.offsetLeft;
      scrollLeft.current = scrollEl.scrollLeft;
      scrollEl.style.cursor = 'grabbing';
      scrollEl.style.userSelect = 'none';
    };
    const touchEndHandler = () => {
      isDragging.current = false;
      scrollEl.style.cursor = '';
      scrollEl.style.userSelect = '';
    };
    const touchMoveHandler = (e: TouchEvent) => {
      if (!isDragging.current) return;
      const x = e.touches[0].pageX - scrollEl.offsetLeft;
      const walk = x - startX.current;
      scrollEl.scrollLeft = scrollLeft.current - walk;
    };

    scrollEl.addEventListener('mousedown', mouseDownHandler);
    scrollEl.addEventListener('mouseleave', mouseLeaveHandler);
    scrollEl.addEventListener('mouseup', mouseUpHandler);
    scrollEl.addEventListener('mousemove', mouseMoveHandler);
    scrollEl.addEventListener('touchstart', touchStartHandler);
    scrollEl.addEventListener('touchend', touchEndHandler);
    scrollEl.addEventListener('touchmove', touchMoveHandler);

    return () => {
      scrollEl.removeEventListener('mousedown', mouseDownHandler);
      scrollEl.removeEventListener('mouseleave', mouseLeaveHandler);
      scrollEl.removeEventListener('mouseup', mouseUpHandler);
      scrollEl.removeEventListener('mousemove', mouseMoveHandler);
      scrollEl.removeEventListener('touchstart', touchStartHandler);
      scrollEl.removeEventListener('touchend', touchEndHandler);
      scrollEl.removeEventListener('touchmove', touchMoveHandler);
    };
  }, []);

  return (
    <section className="option-block-accessory">
      <div className="option-title-row">
        <h3>{title}</h3>
      </div>
      <div className="row-scroll-wrap">
        <div className="row-scroll" ref={scrollRef} style={{ cursor: 'grab' }}>
          {items.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`option-card ${selectedId === item.id ? 'active' : ''}`}
              onClick={() => onSelect(selectedId === item.id ? null : item.id)}
            >
              {item.preview}
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
