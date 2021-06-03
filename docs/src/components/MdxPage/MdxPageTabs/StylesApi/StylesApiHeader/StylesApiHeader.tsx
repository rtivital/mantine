import React from 'react';
import { Title, Text } from '@mantine/core';
import CodeHighlight from '../../../../CodeHighlight/CodeHighlight';
import { generateRootCode } from '../generate-styles-code';
import GatsbyLink from '../../../MdxProvider/GatsbyLink/GatsbyLink';

interface StylesApiHeaderProps {
  component: string;
  singleNode: boolean;
}

export function StylesApiHeader({ component, singleNode }: StylesApiHeaderProps) {
  return (
    <>
      <Title order={2} style={{ fontWeight: 600, marginBottom: 15 }}>
        {singleNode ? `${component} styles API` : 'Mantine styles API'}
      </Title>

      {singleNode ? (
        <Text>
          {component} renders single node, use className and style props to override styles:
        </Text>
      ) : (
        <Text style={{ maxWidth: 600, marginBottom: 30 }}>
          Mantine components support styling of individual elements by adding your class or inline
          styles to any element inside component. For more information see{' '}
          <GatsbyLink to="/guides/styles/">styles API guide</GatsbyLink>.
        </Text>
      )}

      {!singleNode && (
        <Text weight={500} style={{ marginBottom: 15 }}>
          Add styles to root element with className or style:
        </Text>
      )}

      <CodeHighlight language="tsx" code={generateRootCode(component)} />
    </>
  );
}