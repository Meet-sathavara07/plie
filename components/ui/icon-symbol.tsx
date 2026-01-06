import React from 'react';
import { Text, TextProps } from 'react-native';

interface IconSymbolProps extends TextProps {
  name: string;
  size?: number;
  color?: string;
}

// Simple icon mapping for common SF Symbols
const iconMap: Record<string, string> = {
  'magnifyingglass': '🔍',
  'calendar': '📅',
  'heart.fill': '❤️',
  'person.fill': '👤',
  'house.fill': '🏠',
  'paperplane.fill': '✈️',
  'chevron.left.forwardslash.chevron.right': '</>',
};

export function IconSymbol({ name, size = 24, color = '#000', style, ...props }: IconSymbolProps) {
  const icon = iconMap[name] || '?';
  
  return (
    <Text
      style={[
        {
          fontSize: size,
          color: color,
          textAlign: 'center',
        },
        style,
      ]}
      {...props}
    >
      {icon}
    </Text>
  );
}