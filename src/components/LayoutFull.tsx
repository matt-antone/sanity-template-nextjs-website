import * as React from "react";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import Main from "@/src/components/Main";
import Container from "@/src/components/Container";
import LayoutHeading from "./LayoutHeading";

interface ILayoutFullProps {
  children: React.ReactNode;
  heading?: string;
}

const LayoutFull: React.FunctionComponent<ILayoutFullProps> = ({
  children,
  heading,
}) => {
  return (
    <>
      <Header />
      <Container>
        { heading && <LayoutHeading text={heading} /> }
        <Main>{children}</Main>
      </Container>
      <Footer />
    </>
  );
};

export default LayoutFull;
