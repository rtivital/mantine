import React, { useLayoutEffect, useRef, useState } from 'react';
import cx from 'clsx';
import { useId, useReducedMotion } from '@mantine/hooks';
import { DefaultProps, MantineNumberSize, MantineSize, useMantineTheme } from '@mantine/theme';
import useStyles, { WRAPPER_PADDING } from './SegmentedControl.styles';

interface SegmentedControlItem {
  value: string;
  label: React.ReactNode;
}

interface SegmentedControlProps
  extends DefaultProps,
    Omit<React.ComponentPropsWithoutRef<'div'>, 'value' | 'onChange'> {
  /** Data based on which controls are rendered */
  data: SegmentedControlItem[];

  /** Current selected value */
  value: string;

  /** Called when value changes */
  onChange(value: string): void;

  /** Name of the radio group, default to random id */
  name?: string;

  /** True if component should have 100% width */
  fullWidth?: boolean;

  /** Active control color from theme, defaults to white in light color scheme and theme.colors.dark[9] in dark */
  color?: string;

  /** Border-radius from theme or number to set border-radius in px */
  radius?: MantineNumberSize;

  /** Transition duration in ms, set to 0 to turn off transitions */
  transitionDuration?: number;

  /** Transition timing function for all transitions, defaults to theme.transitionTimingFunction */
  transitionTimingFunction?: string;

  /** Controls font-size, paddings and height */
  size?: MantineSize;
}

export function SegmentedControl({
  className,
  themeOverride,
  data,
  name,
  value,
  onChange,
  color,
  fullWidth,
  radius = 'sm',
  size = 'sm',
  transitionDuration = 200,
  transitionTimingFunction,
  ...others
}: SegmentedControlProps) {
  // reduce motion should be implemented via js, there is a bug in jss with media queries
  // https://github.com/cssinjs/jss/issues/1320
  const reduceMotion = useReducedMotion();
  const theme = useMantineTheme(themeOverride);
  const classes = useStyles({
    theme,
    size,
    fullWidth,
    color,
    radius,
    reduceMotion,
    transitionDuration,
    transitionTimingFunction,
  });
  const [activePosition, setActivePosition] = useState({ width: 0, translate: 0 });
  const uuid = useId(name);
  const refs = useRef<Record<string, HTMLLabelElement>>({});
  const wrapperRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (value in refs.current) {
      const element = refs.current[value];
      const rect = element.getBoundingClientRect();
      setActivePosition({
        width: rect.width,
        translate: rect.x - wrapperRef.current.getBoundingClientRect().x - WRAPPER_PADDING,
      });
    }
  }, [value, refs]);

  const controls = data.map((item) => (
    <div
      className={cx(classes.control, { [classes.controlActive]: value === item.value })}
      key={item.value}
    >
      <input
        className={classes.input}
        type="radio"
        name={uuid}
        value={item.value}
        id={`${uuid}-${item.value}`}
        checked={value === item.value}
        onChange={(event) => onChange(event.currentTarget.value)}
      />

      <label
        className={cx(classes.label, { [classes.labelActive]: value === item.value })}
        htmlFor={`${uuid}-${item.value}`}
        ref={(node) => {
          refs.current[item.value] = node;
        }}
      >
        {item.label}
      </label>
    </div>
  ));

  return (
    <div className={cx(classes.wrapper, className)} ref={wrapperRef} {...others}>
      <span
        className={classes.active}
        style={{
          display: value ? 'block' : 'none',
          width: activePosition.width,
          transform: `translateX(${activePosition.translate}px)`,
        }}
      />
      {controls}
    </div>
  );
}

SegmentedControl.displayName = '@mantine/core/SegmentedControl';