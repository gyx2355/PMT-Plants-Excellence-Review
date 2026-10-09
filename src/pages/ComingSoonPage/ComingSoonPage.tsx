import React from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { Card, CardHeader, Text, Body1 } from '@fluentui/react-components';

export const ComingSoonPage: React.FC<{ featureName?: string }> = ({ featureName = 'Trend & Insights' }) => {
  return (
    <div>
      <PageHeader
        title={featureName}
        subtitle="This feature module is reserved for future releases"
      />
      <Card style={{ padding: '32px', textAlign: 'center' }}>
        <CardHeader header={<Text weight="semibold" size={500}>{featureName} - Coming Soon</Text>} />
        <Body1 style={{ marginTop: '16px', color: '#64748B' }}>
          Production volume trend charts, material balance analytics, and forecast comparison modules will be added in upcoming project releases.
        </Body1>
      </Card>
    </div>
  );
};
