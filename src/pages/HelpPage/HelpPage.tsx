import React from 'react';
import { PageHeader } from '../../components/common/PageHeader';
import { Card, CardHeader, Text, Body1, Accordion, AccordionItem, AccordionHeader, AccordionPanel } from '@fluentui/react-components';

export const HelpPage: React.FC = () => {
  return (
    <div>
      <PageHeader
        title="Help & System Guide"
        subtitle="Frequently asked questions and usage rules for PMT Plants Excellence Review System"
      />
      <Card style={{ padding: '24px' }}>
        <CardHeader header={<Text weight="semibold" size={400}>User FAQs</Text>} />
        <Accordion collapsible style={{ marginTop: '16px' }}>
          <AccordionItem value="1">
            <AccordionHeader>How is the completion status calculated on KPI Overview?</AccordionHeader>
            <AccordionPanel>
              <Body1>
                Completion percentage is derived from entered Monthly KPI Results divided by total applicable active KPI Definitions for the selected plant and period.
              </Body1>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem value="2">
            <AccordionHeader>What is the difference between 0 and Missing data?</AccordionHeader>
            <AccordionPanel>
              <Body1>
                Numeric 0 is a valid entered actual result (e.g. 0 safety incidents). Missing data indicates no result has been recorded yet and is styled with a Grey status.
              </Body1>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem value="3">
            <AccordionHeader>Who can edit PMT Plants, KPI Definitions, and Targets?</AccordionHeader>
            <AccordionPanel>
              <Body1>
                Only authorized administrators with Dataverse write privileges can access administration tools to update master records.
              </Body1>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Card>
    </div>
  );
};
