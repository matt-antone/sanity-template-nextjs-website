import * as React from 'react';
import PaintMixes from './PaintMixes';
import SanityPortableText from '@/components/SanityPortableText';

interface IStepsProps {
  steps: any[];
}

const Steps: React.FunctionComponent<IStepsProps> = ({ steps }) => {
  return (
    <ol>
            {steps.map((step: any) => {
              return (
                <li key={step._key}>
                  <h2>{step.step}</h2>
                  <div className="not-prose">
                    <PaintMixes paintList={step.paintList} />
                  </div>
                  <SanityPortableText blocks={step.description} />
                </li>
              );
            })}
          </ol>
  );
};

export default Steps;
