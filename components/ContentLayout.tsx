import * as React from "react";

interface IContentLayoutProps {
  children: React.ReactNode;
  widgets?: React.FunctionComponent[] | null;
}

const ContentLayout: React.FunctionComponent<IContentLayoutProps> = ({
  children,
  widgets,
}) => {
  return (
    <div className={``}>
      <main
        id="content"
        className={widgets ? "col-span-12 lg:col-span-9" : "col-span-12"}
      >
        {children}
      </main>
      {widgets && (
        <aside className="cols-span-12 lg:col-span-3">
          {widgets?.map((Widget, index) => (
            <Widget key={index} />
          ))}
        </aside>
      )}
    </div>
  );
};

export default ContentLayout;
