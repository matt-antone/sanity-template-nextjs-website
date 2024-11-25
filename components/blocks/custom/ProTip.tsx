import type { PortableTextBlock } from 'sanity';
import SanityPortableText from '@/components/SanityPortableText';
import * as React from 'react';

interface IProTipProps {
  title: string;
  content: PortableTextBlock[];
}

const ProTip: React.FunctionComponent<IProTipProps> = (props) => {
  return <div className="bg-slate-300 p-4 rounded-md text-sm">
    <h3 className="text-lg font-bold">Pro Tip: {props.title}</h3>
    <SanityPortableText blocks={props.content} />
  </div>;
};

export default ProTip;
