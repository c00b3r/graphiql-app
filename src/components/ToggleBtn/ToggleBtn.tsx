'use client';
import * as React from 'react';
import { ToggleButton } from '@mui/material';
import { ToggleButtonGroup } from '@mui/material';

export default function ColorToggleButton() {
  const [alignment, setAlignment] = React.useState('en');

  const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
    setAlignment(newAlignment);
  };

  return (
    <ToggleButtonGroup color="primary" value={alignment} exclusive onChange={handleChange} aria-label="Platform">
      <ToggleButton size="small" value="en">
        EN
      </ToggleButton>
      <ToggleButton size="small" value="ru">
        RU
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
