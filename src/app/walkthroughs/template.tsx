import * as React from 'react';
import PageTransition from '@/components/PageTransition';

interface ITemplateProps {
  children: React.ReactNode
}

const Template: React.FunctionComponent<ITemplateProps> = (props) => {
  return (
    <PageTransition>
      {props.children}
    </PageTransition>
  );
};

export default Template;
