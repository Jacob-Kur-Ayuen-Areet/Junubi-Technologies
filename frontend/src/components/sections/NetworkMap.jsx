import React, { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const CITIES = {
  juba:    { x: 230, y: 310, label: 'Juba', hub: true },
  wau:     { x: 105, y: 195, label: 'Wau' },
  malakal: { x: 290, y: 110, label: 'Malakal' },
  yei:     { x: 200, y: 390, label: 'Yei' },
  bor:     { x: 290, y: 260, label: 'Bor' },
  rumbek:  { x: 135, y: 265, label: 'Rumbek' },
};

const CONNECTIONS = [
  ['juba', 'wau'],
  ['juba', 'malakal'],
  ['juba', 'yei'],
  ['juba', 'bor'],
  ['juba', 'rumbek'],
];

function PulseDot({ x, y, isHub, prefersReduced }) {
  return (
    <g>
      {isHub && !prefersReduced && (
        <>
          <circle cx={x} cy={y} r={20} fill="none" stroke="#E7A94B" strokeWidth="1" opacity="0.3">
            <animate attributeName="r" values="20;32;20" dur="3s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx={x} cy={y} r={14} fill="none" stroke="#E7A94B" strokeWidth="1" opacity="0.5">
            <animate attributeName="r" values="14;24;14" dur="3s" begin="0.5s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.5;0;0.5" dur="3s" begin="0.5s" repeatCount="indefinite" />
          </circle>
        </>
      )}
      <circle
        cx={x} cy={y}
        r={isHub ? 8 : 5}
        fill={isHub ? '#E7A94B' : '#3FC1B0'}
        stroke={isHub ? '#f0c47a' : '#6dd4c8'}
        strokeWidth="2"
      />
    </g>
  );
}

function AnimatedLine({ x1, y1, x2, y2, index, prefersReduced }) {
  const length = Math.hypot(x2 - x1, y2 - y1);
  if (prefersReduced) {
    return (
      <line x1={x1} y1={y1} x2={x2} y2={y2}
        stroke="#3FC1B0" strokeWidth="1" opacity="0.3" strokeDasharray="4 4" />
    );
  }
  return (
    <line x1={x1} y1={y1} x2={x2} y2={y2}
      stroke="url(#lineGradient)" strokeWidth="1.5" opacity="0.6"
      strokeDasharray={`${length}`} strokeDashoffset={`${length}`}>
      <animate
        attributeName="stroke-dashoffset"
        from={length} to="0"
        dur="1.5s"
        begin={`${index * 0.3}s`}
        fill="freeze"
      />
    </line>
  );
}

export default function NetworkMap({ className = '' }) {
  const prefersReduced = useReducedMotion();

  return (
    <svg
      viewBox="0 0 400 480"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Network map of South Sudan showing Juba connected to Wau, Malakal, Yei, Bor, and Rumbek"
      role="img"
      className={className}
      style={{ overflow: 'visible' }}
    >
      <defs>
        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E7A94B" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#3FC1B0" stopOpacity="0.8" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* South Sudan simplified outline */}
      <path
        d="M80,60 L120,40 L200,35 L290,50 L350,90 L370,150 L360,220 L340,290 L320,360 L280,420 L230,450 L160,440 L100,400 L60,330 L50,250 L55,160 L70,100 Z"
        fill="none"
        stroke="rgba(63,193,176,0.12)"
        strokeWidth="1.5"
        strokeDasharray="4 4"
      />

      {/* Connection lines */}
      {CONNECTIONS.map(([from, to], i) => {
        const f = CITIES[from];
        const t = CITIES[to];
        return (
          <AnimatedLine key={`${from}-${to}`}
            x1={f.x} y1={f.y} x2={t.x} y2={t.y}
            index={i} prefersReduced={prefersReduced}
          />
        );
      })}

      {/* City nodes */}
      {Object.entries(CITIES).map(([key, city]) => (
        <g key={key} filter={city.hub ? 'url(#glow)' : undefined}>
          <PulseDot x={city.x} y={city.y} isHub={city.hub} prefersReduced={prefersReduced} />
          <text
            x={city.x + (city.hub ? 12 : 9)}
            y={city.y + 4}
            fill={city.hub ? '#E7A94B' : '#F3EFE4'}
            fontSize={city.hub ? '13' : '11'}
            fontFamily="Space Grotesk, sans-serif"
            fontWeight={city.hub ? '700' : '500'}
            opacity={city.hub ? '1' : '0.85'}
          >
            {city.label}
          </text>
        </g>
      ))}

      {/* Data packets travelling along lines — decorative */}
      {!prefersReduced && CONNECTIONS.map(([from, to], i) => {
        const f = CITIES[from];
        const t = CITIES[to];
        return (
          <circle key={`packet-${i}`} r="3" fill="#E7A94B" opacity="0.9">
            <animateMotion
              dur={`${2.5 + i * 0.4}s`}
              begin={`${1 + i * 0.5}s`}
              repeatCount="indefinite"
              path={`M${f.x},${f.y} L${t.x},${t.y}`}
            />
          </circle>
        );
      })}
    </svg>
  );
}
