import * as React from "react";
import Main from "@/src/components/Main";
import Container from "@/src/components/Container";
interface ILayoutSidebarProps {
  children: React.ReactNode;
  widgets?: React.FunctionComponent[] | null;
}

const LayoutSidebar: React.FunctionComponent<ILayoutSidebarProps> = (props) => {
  return (
    <Container>
      <div className="grid lg:grid-cols-2">
        <Main>{props.children}</Main>
        <aside>
          {props.widgets?.map((Widget, index) => (
            <Widget key={index} />
          ))}
        </aside>
      </div>
    </Container>
  );
};

export default LayoutSidebar;
