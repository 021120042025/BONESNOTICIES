'use client';

import { useState, useRef } from 'react';
import { Q5_TERMS, Q5_DEFINITIONS } from '@/data/quizData';
import type { Q5Answer } from '@/data/types';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface Props {
  value: Q5Answer;
  onChange: (v: Q5Answer) => void;
}

const ROW_H = 110; // px – height of each definition card
const GAP   = 10;  // px – gap between cards
const RH    = ROW_H + GAP; // 120 px per logical slot

export default function Q5DefinitionMatch({ value, onChange }: Props) {
  // Logical order of definition IDs (index = which term row it sits next to)
  const [order, setOrder] = useState<string[]>(() => {
    const defIds = Q5_DEFINITIONS.map(d => d.id);
    if (Object.keys(value).length === Q5_TERMS.length) {
      // Restore previous answer order
      return Q5_TERMS.map(t => value[t]).filter(Boolean) as string[];
    }
    return shuffle(defIds);
  });

  // Pointer start position stored in a ref so pointermove never triggers re-renders
  const dragRef = useRef<{ id: string; startY: number } | null>(null);

  // These two drive the visual: which card is active + how far it has moved
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dragDeltaY, setDragDeltaY] = useState(0);

  function emitAnswer(newOrder: string[]) {
    const answer: Q5Answer = {};
    Q5_TERMS.forEach((term, i) => {
      if (newOrder[i]) answer[term] = newOrder[i];
    });
    onChange(answer);
  }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>, id: string) {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = { id, startY: e.clientY };
    setDraggingId(id);
    setDragDeltaY(0);
  }

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>, id: string) {
    const ds = dragRef.current;
    if (!ds || ds.id !== id) return;

    const delta      = e.clientY - ds.startY;
    const currentRow = order.indexOf(id);
    const targetRow  = Math.max(0, Math.min(order.length - 1,
      Math.round(currentRow + delta / RH),
    ));

    if (targetRow !== currentRow) {
      // Reorder
      const newOrder = [...order];
      newOrder.splice(currentRow, 1);
      newOrder.splice(targetRow, 0, id);
      setOrder(newOrder);
      emitAnswer(newOrder);

      // Shift the reference point so the live delta stays near zero after the swap,
      // keeping the card pinned under the pointer without a visual jump.
      dragRef.current = { id, startY: ds.startY + (targetRow - currentRow) * RH };
    }

    // Always update delta so the dragged card tracks the pointer in real time.
    setDragDeltaY(e.clientY - (dragRef.current?.startY ?? ds.startY));
  }

  function handlePointerUp(e: React.PointerEvent<HTMLDivElement>, id: string) {
    if (!dragRef.current || dragRef.current.id !== id) return;
    try { e.currentTarget.releasePointerCapture(e.pointerId); } catch (_) { /* noop */ }
    dragRef.current = null;
    setDraggingId(null);
    setDragDeltaY(0);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
      {/* Match board */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '96px 1fr',
          gap: '10px',
          touchAction: 'none',
        }}
      >
        {/* Left column – fixed term labels */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: `${GAP}px` }}>
          {Q5_TERMS.map(term => (
            <div
              key={term}
              style={{
                height: `${ROW_H}px`,
                background: '#1a1410',
                color: '#ece9e9',
                borderRadius: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: '12px',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                lineHeight: 1.1,
                padding: '12px 8px',
                boxShadow: '0 2px 0 0 rgba(0,0,0,0.1), 0 4px 14px -6px rgba(0,0,0,0.25)',
                flexShrink: 0,
              }}
            >
              {term}
            </div>
          ))}
        </div>

        {/* Right column – draggable definition cards */}
        <div
          style={{
            position: 'relative',
            height: `${Q5_DEFINITIONS.length * ROW_H + (Q5_DEFINITIONS.length - 1) * GAP}px`,
          }}
        >
          {order.map(defId => {
            const def = Q5_DEFINITIONS.find(d => d.id === defId);
            if (!def) return null;

            const row        = order.indexOf(defId);
            const isDragging = draggingId === defId;

            // Dragged card: settled slot position + live pointer delta.
            // Other cards: settled slot position only, animated by CSS transition.
            const translateY = isDragging ? row * RH + dragDeltaY : row * RH;

            return (
              <div
                key={defId}
                onPointerDown={e => handlePointerDown(e, defId)}
                onPointerMove={e => handlePointerMove(e, defId)}
                onPointerUp={e => handlePointerUp(e, defId)}
                onPointerCancel={e => handlePointerUp(e, defId)}
                className="no-select"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: `${ROW_H}px`,
                  background: '#ffffff',
                  color: '#1a1410',
                  borderRadius: '18px',
                  padding: '14px 32px 14px 18px',
                  fontFamily: 'var(--font-serif)',
                  fontSize: '11.5px',
                  lineHeight: 1.32,
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  willChange: 'transform',
                  transform: `translateY(${translateY}px)`,
                  // Only the dragged card suppresses the transform transition so it
                  // tracks the pointer frame-perfectly.  Other cards animate smoothly.
                  transition: isDragging
                    ? 'box-shadow 180ms ease-out'
                    : 'transform 200ms cubic-bezier(.2,.7,.2,1), box-shadow 180ms ease-out',
                  zIndex: isDragging ? 10 : 1,
                  boxShadow: isDragging
                    ? '0 12px 32px -8px rgba(26,20,16,0.4), 0 0 0 2px #00ff00'
                    : '0 2px 0 0 rgba(26,20,16,0.06), 0 4px 14px -6px rgba(26,20,16,0.15), 0 1px 2px rgba(26,20,16,0.06)',
                  cursor: isDragging ? 'grabbing' : 'grab',
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                }}
              >
                <span>{def.text}</span>

                {/* Drag handle — decorative, non-interactive */}
                <span
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '3px',
                    opacity: 0.35,
                    pointerEvents: 'none',
                  }}
                >
                  {[0, 1, 2].map(i => (
                    <span
                      key={i}
                      style={{
                        display: 'block',
                        width: '14px',
                        height: '1.5px',
                        background: '#1a1410',
                        borderRadius: '999px',
                      }}
                    />
                  ))}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
