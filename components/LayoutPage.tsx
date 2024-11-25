import * as React from 'react';
import SanityPortableText from "@/components/SanityPortableText";
import LayoutHeading from "@/components/LayoutHeading";
import Prose from './Prose';

interface ILayouPageProps {
  title?: string;
  body?: any;
}

const LayoutPage: React.FunctionComponent<ILayouPageProps> = ({body,title}) => {
  return body && (
    <Prose>
      <SanityPortableText blocks={body} />
    </Prose>
  );
};

export default LayoutPage;
