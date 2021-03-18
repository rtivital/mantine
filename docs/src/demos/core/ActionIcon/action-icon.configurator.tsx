import React from 'react';
import { ActionIcon, ElementsGroup } from '@mantine/core';
import { GearIcon } from '@modulz/radix-icons';
import Configurator from '../../../components/Configurator/Configurator';

function ActionIconWrapper(props: React.ComponentPropsWithoutRef<typeof ActionIcon>) {
  return (
    <ElementsGroup position="center">
      <ActionIcon {...props}>
        <GearIcon />
      </ActionIcon>
    </ElementsGroup>
  );
}

const codeTemplate = (props: string) => `<ActionIcon${props}>
  <GearIcon />
</ActionIcon>`;

export function ActionIconConfigurator() {
  return (
    <Configurator
      title="Size, radius and color props"
      component={ActionIconWrapper}
      codeTemplate={codeTemplate}
      props={[
        { name: 'color', type: 'color', initialValue: 'gray', defaultValue: 'gray' },
        { name: 'size', type: 'size', initialValue: 'md', defaultValue: 'md' },
        { name: 'radius', type: 'size', initialValue: 'sm', defaultValue: 'sm' },
      ]}
    />
  );
}