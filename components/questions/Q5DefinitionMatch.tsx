'use client';

import { useState, useRef, useCallback } from 'react';
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

const ROW_H = 110; // px, height of each def card
const GAP   = 10;  // px, gap between cards

export default function Q5DefinitionMatch({ value, onChange }: Props) {
  // Initialise order from Q5Answer (if already set) or shuffle
  const [order, setOrder] = useState<string[]>(() => {
    const defIds = Q5_DEFINITIONS.map(d => d.id);
    if (Object.keys(value).length === Q5_TERMS.length) {
      // Reconstruct order from existing answer
      return Q5_TERMS.map(t => value[t]).filter(Boolean) as string[];
    }
    return shuffle(defIds);
  });

  const getDefText = (id: string) => Q5_DEFINITIONS.find(d => d.id === id)?.text ?? '';

  // Emit Q5Answer based on current order
  const emitAnswer = useCallback((newOrder: string[]) => {
    const answer: Q5Answer = {};
    Q5_TERMS.forEach((term, i) => {
      if (newOrder[i]) answer[term] = newOrder[i];
    });
    onChange(answer);
  }, [onChange]);

  // Drag state (ref-based to avoid re-render during drag)
  const dragState = useRef<{
    id: string;
    startY: number;
    startRow: number;
    currentRow: number;
  } | null>(null);

  // Track rendered Y-positions of each def element
  const elemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // For controlled re-render after row swap
  const [, forceUpdate] = useState(0);

  function rowHeight() { return ROW_H + GAP; }

  function handlePointerDown(e: React.PointerEvent, id: string) {
    e.currentTarget.setPointerCapture(e.pointerId);
    const row = order.indexOf(id);
    dragState.current = { id, startY: e.clientY, startRow: row, currentRow: row };
    const el = elemRefs.current[id];
    if (el) {
      el.style.transition = 'box-shadow 180ms ease-out';
      el.style.zIndex = '10';
      el.style.cursor = 'grabbing';
      el.style.boxShadow = '0 12px 32px -8px rgba(26,20,16,0.4), 0 0 0 2px #00ff00';
    }
    forceUpdate(n => n + 1);
  }

  function handlePointerMove(e: React.PointerEvent, id: string) {
    const ds = dragState.current;
    if (!ds || ds.id !== id) return;

    const deltaY = e.clientY - ds.startY;
    const el = elemRefs.current[id];
    const RH = rowHeight();

    // Position of dragged element = its natural position offset by accumulated swaps + live delta
    const naturalPos = ds.startRow; // where it started
    const currentPos = ds.currentRow;
    const translateY = (currentPos - naturalPos) * RH + deltaY;

    if (el) {
      el.style.transform = `translateY(${translateY}px)`;
    }

    // Check if we crossed into a new row
    const visualRow = currentPos + deltaY / RH;
    const newRow = Math.max(0, Math.min(order.length - 1, Math.round(visualRow)));

    if (newRow !== currentPos) {
      // Swap in order array
      const newOrder = [...order];
      newOrder.splice(currentPos, 1);
      newOrder.splice(newRow, 0, id);
      setOrder(newOrder);

      // Emit answer immediately on any swap
      emitAnswer(newOrder);

      // Update drag state
      const deltaRowShift = newRow - currentPos;
      dragState.current = {
        ...ds,
        startY: ds.startY + deltaRowShift * RH,
        currentRow: newRow,
      };

      // Settle other elements
      newOrder.forEach((otherId, i) => {
        if (otherId === id) return;
        const otherEl = elemRefs.current[otherId];
        if (otherEl) {
          // natural position of otherId in newOrder is i
          // but its DOM position (natural) was its original order index = newOrder pre-swap
          // We use data-natural for the initial index (set at first render)
          const natural = parseInt(otherEl.dataset.natural ?? '0', 10);
          otherEl.style.transition = 'transform 220ms cubic-bezier(.2,.7,.2,1)';
          otherEl.style.transform = `translateY(${(i - natural) * RH}px)`;
        }
      });

      // Update dragged element's transform based on new reference
      const newDelta = e.clientY - dragState.current.startY;
      const newTranslateY = (newRow - ds.startRow) * RH + newDelta;
      if (el) {
        el.style.transform = `translateY(${newTranslateY}px)`;
      }
    }
  }

  function handlePointerUp(e: React.PointerEvent, id: string) {
    const ds = dragState.current;
    if (!ds || ds.id !== id) return;

    try { e.currentTarget.releasePointerCapture(e.pointerId); } catch (_) {}

    const el = elemRefs.current[id];
    const currentPos = ds.currentRow;
    const naturalPos = ds.startRow;
    const RH = rowHeight();

    if (el) {
      el.style.transition = 'transform 280ms cubic-bezier(.2,.7,.2,1), box-shadow 220ms';
      el.style.transform = `translateY(${(currentPos - naturalPos) * RH}px)`;
      el.style.boxShadow = '0 2px 0 0 rgba(26,20,16,0.06), 0 4px 14px -6px rgba(26,20,16,0.15), 0 1px 2px rgba(26,20,16,0.06)';
      el.style.zIndex = '';
      el.style.cursor = 'grab';
    }

    dragState.current = null;
    forceUpdate(n => n + 1);
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
        {/* Left: Terms (fixed) */}
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

        {/* Right: Definitions (draggable, positioned absolutely within relative container) */}
        <div
          style={{
            position: 'relative',
            height: `${Q5_DEFINITIONS.length * ROW_H + (Q5_DEFINITIONS.length - 1) * GAP}px`,
          }}
        >
          {order.map((defId, naturalIdx) => {
            // The initial natural position of this element IS its position in order on mount
            // We track by storing data-natural as its CURRENT index in the initial order
            // But since order changes, we track natural as the ORIGINAL mount index
            const def = Q5_DEFINITIONS.find(d => d.id === defId);
            if (!def) return null;

            const isDragging = dragState.current?.id === defId;

            return (
              <div
                key={defId}
                ref={el => {
                  elemRefs.current[defId] = el;
                  if (el && !el.dataset.natural) {
                    el.dataset.natural = String(naturalIdx);
                  }
                }}
                onPointerDown={e => handlePointerDown(e, defId)}
                onPointerMove={e => handlePointerMove(e, defId)}
                onPointerUp={e => handlePointerUp(e, defId)}
                onPointerCancel={e => handlePointerUp(e, defId)}
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
                  boxShadow: isDragging
                    ? '0 12px 32px -8px rgba(26,20,16,0.4), 0 0 0 2px #00ff00'
                    : '0 2px 0 0 rgba(26,20,16,0.06), 0 4px 14px -6px rgba(26,20,16,0.15), 0 1px 2px rgba(26,20,16,0.06)',
                  cursor: 'grab',
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  willChange: 'transform',
                  // Transform is managed imperatively via ref, but set initial here
                  transform: `translateY(${naturalIdx * (ROW_H + GAP)}px)`,
                  zIndex: isDragging ? 10 : 1,
                  transition: isDragging ? 'box-shadow 180ms ease-out' : undefined,
                }}
              >
                <span>{def.text}</span>
                {/* Drag handle */}
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
