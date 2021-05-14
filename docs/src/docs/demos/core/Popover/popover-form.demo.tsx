import React, { useState } from 'react';
import {
  Popover,
  Button,
  Group,
  TextInput,
  Avatar,
  Text,
  ActionIcon,
  useMantineTheme,
} from '@mantine/core';
import { useForm, useMediaQuery } from '@mantine/hooks';
import { GearIcon } from '@modulz/radix-icons';
import CodeDemo from '../../../../components/CodeDemo/CodeDemo';

const code = `import React, { useState } from 'react';
import { Popover, ActionIcon, Group } from '@mantine/core';
import { GearIcon } from '@modulz/radix-icons';

function Demo() {
  const [opened, setOpened] = useState(false);
  const [values, setValues] = useState({
    name: 'Bob Handsome',
    email: 'bob@handsome.inc',
  });

  return (
    <Group>
      <User name={values.name} email={values.email} />

      <Popover
        opened={opened}
        onClose={() => setOpened(false)}
        position="bottom"
        placement="end"
        withArrow
        withCloseButton
        target={
          <ActionIcon variant="light" onClick={() => setOpened(true)}>
            <GearIcon />
          </ActionIcon>
        }
      >
        <UserEditForm
          initialValues={values}
          onCancel={() => setOpened(false)}
          onSubmit={(data) => {
            setValues(data);
            setOpened(false);
          }}
        />
      </Popover>
    </Group>
  );
}`;

function UserEditForm({
  initialValues,
  onSubmit,
  onCancel,
}: {
  initialValues: { name: string; email: string };
  onSubmit(values: { name: string; email: string }): void;
  onCancel(): void;
}) {
  const isMobile = useMediaQuery('(max-width: 755px');
  const form = useForm({
    initialValues,
    validationRules: {
      name: (value) => value.trim().length > 2,
      email: (value) => value.trim().length > 2,
    },
  });

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <TextInput
        required
        label="Name"
        placeholder="Name"
        style={{ minWidth: isMobile ? 220 : 300 }}
        value={form.values.name}
        onChange={(event) => form.setFieldValue('name', event.currentTarget.value)}
        error={form.errors.name}
      />

      <TextInput
        required
        label="Email"
        placeholder="Email"
        style={{ minWidth: isMobile ? 220 : 300, marginTop: 15 }}
        value={form.values.email}
        onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
        error={form.errors.email}
      />

      <Group position="apart" style={{ marginTop: 15 }}>
        <Button variant="link" color="gray" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save</Button>
      </Group>
    </form>
  );
}

function User({ name, email, className }: { name: string; email: string; className?: string }) {
  return (
    <div className={className} style={{ display: 'flex' }}>
      <Avatar style={{ marginRight: 15 }} color="blue">
        {name
          .split(' ')
          .map((part) => part.charAt(0).toUpperCase())
          .slice(0, 2)
          .join('')}
      </Avatar>

      <div style={{ marginRight: 15 }}>
        <Text>{name}</Text>
        <Text size="xs" color="gray">
          {email}
        </Text>
      </div>
    </div>
  );
}

function Demo() {
  const [values, setValues] = useState({ name: 'Bob Handsome', email: 'bob@handsome.inc' });
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();

  return (
    <Group>
      <User name={values.name} email={values.email} />

      <Popover
        opened={opened}
        onClose={() => setOpened(false)}
        position="bottom"
        placement="end"
        withArrow
        withCloseButton
        target={
          <ActionIcon
            variant={theme.colorScheme === 'dark' ? 'hover' : 'light'}
            onClick={() => setOpened(true)}
          >
            <GearIcon />
          </ActionIcon>
        }
      >
        <UserEditForm
          initialValues={values}
          onCancel={() => setOpened(false)}
          onSubmit={(data) => {
            setValues(data);
            setOpened(false);
          }}
        />
      </Popover>
    </Group>
  );
}

export function PopoverFormDemo() {
  return (
    <CodeDemo code={code} language="tsx">
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Demo />
      </div>
    </CodeDemo>
  );
}