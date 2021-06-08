import React from 'react';
import { DefaultProps, useMantineTheme, mergeStyles, MantineNumberSize } from '../../../theme';
import { Marks } from '../Marks/Marks';
import useStyles from './Track.styles';

export type TrackStylesNames = keyof ReturnType<typeof useStyles>;

interface TrackProps extends DefaultProps<TrackStylesNames> {
  position: number;
  marks: { value: number; label?: React.ReactNode }[];
  size: MantineNumberSize;
  radius: MantineNumberSize;
  color: string;
  min: number;
  max: number;
  value: number;
  children: React.ReactNode;
  onChange(value: number): void;
}

export function Track({
  position,
  size,
  color,
  max,
  min,
  value,
  classNames,
  styles,
  marks,
  radius,
  themeOverride,
  children,
  onChange,
}: TrackProps) {
  const theme = useMantineTheme(themeOverride);
  const classes = useStyles({ theme, color, size, radius }, classNames);
  const _styles = mergeStyles(classes, styles);

  return (
    <div className={classes.track} style={_styles.track}>
      <div className={classes.bar} style={{ ..._styles.bar, width: `${position}%` }} />

      {children}

      <Marks
        marks={marks}
        size={size}
        color={color}
        min={min}
        max={max}
        value={value}
        classNames={classNames as any}
        styles={styles as any}
        themeOverride={themeOverride}
        onChange={onChange}
      />
    </div>
  );
}

Track.displayName = '@mantine/core/SliderTrack';