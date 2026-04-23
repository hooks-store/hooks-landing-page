import { useState } from 'react';

interface ConnectBarProps {
  placeholder?: string;
  onConnect?: (value: string) => void;
}

export function ConnectBar({ placeholder = 'tu@email.com', onConnect }: ConnectBarProps) {
  const [value, setValue] = useState('');

  return (
    <div
      className="flex items-center w-full"
      style={{
        height: '56px',
        backgroundColor: '#FFFFFF',
        borderRadius: '999px',
        paddingLeft: '16px',
        paddingRight: '6px',
        boxShadow: '0 0 30px 0 rgba(255, 255, 255, 0.08)',
      }}
    >
      <input
        type="email"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
        className="flex-1 min-w-0 bg-transparent outline-none border-none"
        style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 400,
          fontSize: '14px',
          color: '#111827',
        }}
      />
      <button
        type="button"
        onClick={() => onConnect?.(value)}
        className="flex-shrink-0 flex items-center whitespace-nowrap"
        style={{
          backgroundColor: '#000000',
          borderRadius: '999px',
          height: '40px',
          paddingTop: '8px',
          paddingBottom: '8px',
          paddingLeft: '16px',
          paddingRight: '16px',
          fontFamily: "'Inter', sans-serif",
          fontWeight: 600,
          fontSize: '14px',
          color: '#FFFFFF',
          lineHeight: 1,
        }}
      >
        Conectar con
      </button>
    </div>
  );
}
