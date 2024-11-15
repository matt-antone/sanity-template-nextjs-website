import * as React from 'react';
import {PortableText} from '@portabletext/react';
import {components} from '@/components/blocks';
import LayoutHeading from "@/components/LayoutHeading";
import Prose from './Prose';

interface ILayouPageProps {
  title?: string;
  body?: any;
}

const LayoutPage: React.FunctionComponent<ILayouPageProps> = ({body,title}) => {
  return body && (
    <div>
      <LayoutHeading text={title || "Untitled"} />
      <Prose>
        <PortableText value={body} components={components} />
      </Prose>
    </div>
  );
};

export default LayoutPage;
