import * as React from "react";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import Main from "@/src/components/Main";
import Container from "@/src/components/Container";
import LayoutHeading from "./LayoutHeading";

interface ILayoutSidebarProps {
  children: React.ReactNode;
  heading?: string;
  widgets?: React.FunctionComponent[] | null;
}

const LayoutSidebar: React.FunctionComponent<ILayoutSidebarProps> = ({
  heading,
  children,
  widgets,
}) => {
  return (
    <>
      <Header />
      <Container>
        {heading && <LayoutHeading text={heading} />}
        <div className="w-full grid lg:grid-cols-10 gap-12">
          <Main className="col-span-7">{children}</Main>
          <aside className="col-span-3">
            {widgets?.map((Widget, index) => (
              <Widget key={index} />
            ))}
          </aside>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default LayoutSidebar;
