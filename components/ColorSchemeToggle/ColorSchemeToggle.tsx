'use client';

import { Button, useMantineColorScheme, useComputedColorScheme } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { IconSunFilled, IconMoonFilled } from '@tabler/icons-react';
import cx from 'clsx';
import classes from './ColorSchemeToggle.module.css';

export function ColorSchemeToggle() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('dark', { getInitialValueInEffect: true });
  const { hovered, ref } = useHover();

  return (
    <Button
      onClick={() => {setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light');} }
      variant="subtle"
      size="md"
      radius="md"
      color="#c7afd4"
      aria-label="Toggle color scheme"
      // ref={ref}
    >
      <IconSunFilled className={cx(classes.icon, classes.light)} stroke={1.5} color={hovered ? "#c7afd4" : "#F8F9FA"} />
      <IconMoonFilled className={cx(classes.icon, classes.dark)} stroke={1.5} color={hovered ? "#c7afd4" : "#424242"} />
    </Button>
  );
}
