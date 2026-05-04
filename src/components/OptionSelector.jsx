import React from 'react';

const OptionSelector = ({
  label = '',
  options = [],
  selected = '',
  onSelect,
  disabled = false,
}) => {
  if (!options || options.length === 0) return null;

  return (
    <div style={{ marginBottom: '1rem' }}>
      {label && (
        <span
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.7rem',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            color: 'rgba(255,255,255,0.4)',
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: 300,
          }}
        >
          {label}
        </span>
      )}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
        {options.map((opt) => {
          const isSelected = selected === opt;
          return (
            <button
              key={opt}
              disabled={disabled}
              onClick={() => onSelect(opt)}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.78rem',
                fontWeight: isSelected ? 500 : 300,
                padding: '0.45rem 1rem',
                background: isSelected ? '#c9a87c' : 'transparent',
                color: isSelected ? '#0f0d0c' : 'rgba(255,255,255,0.6)',
                border: isSelected
                  ? '1px solid #c9a87c'
                  : '1px solid rgba(255,255,255,0.15)',
                cursor: disabled ? 'not-allowed' : 'pointer',
                opacity: disabled ? 0.4 : 1,
                transition: 'all 0.25s ease',
                letterSpacing: '0.03em',
              }}
              onMouseEnter={(e) => {
                if (!disabled && !isSelected) {
                  e.target.style.borderColor = '#c9a87c';
                  e.target.style.color = '#c9a87c';
                }
              }}
              onMouseLeave={(e) => {
                if (!disabled && !isSelected) {
                  e.target.style.borderColor = 'rgba(255,255,255,0.15)';
                  e.target.style.color = 'rgba(255,255,255,0.6)';
                }
              }}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default OptionSelector;
