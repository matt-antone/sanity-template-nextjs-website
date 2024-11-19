import * as React from 'react';
import { PortableText } from '@portabletext/react';
import { components } from "@/components/blocks";
interface ISanityPortableTextProps {
  blocks: any;
}

const SanityPortableText: React.FunctionComponent<ISanityPortableTextProps> = (props) => {
  return <PortableText value={props.blocks} components={components} />;
};

export default SanityPortableText;
