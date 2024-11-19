import ProTip from "./ProTip";

export default {
  proTip: ({ value }: any) =>
    value && (
      <div className="not-prose my-12">
        <ProTip {...value} />
      </div>
    ),
};
