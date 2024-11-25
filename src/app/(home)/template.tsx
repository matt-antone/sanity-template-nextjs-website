import * as React from 'react';
import PageTransition from '@/components/PageTransition';

interface ITemplateProps {
  children: React.ReactNode
}

const Template: React.FunctionComponent<ITemplateProps> = (props) => {
  return props.children;
};

export default Template;
