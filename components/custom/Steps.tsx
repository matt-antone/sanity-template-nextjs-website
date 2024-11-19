import * as React from 'react';
import PaintList from './PaintList';
import SanityPortableText from '@/components/SanityPortableText';

interface IStepsProps {
  steps: any[];
}

const Steps: React.FunctionComponent<IStepsProps> = ({ steps }) => {
  return (
    <ol>
            {steps.map((step: any) => {
              console.log(step);
              return (
                <li key={step._key}>
                  <h2>{step.step}</h2>
                  <div className="not-prose">
                    <PaintList paintList={step.paintList} />
                  </div>
                  <SanityPortableText blocks={step.description} />
                </li>
              );
            })}
          </ol>
  );
};

export default Steps;
