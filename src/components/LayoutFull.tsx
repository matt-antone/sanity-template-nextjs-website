import * as React from "react";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import Main from "@/src/components/Main";
import Container from "@/src/components/Container";

interface ILayoutFullProps {
  children: React.ReactNode;
}

const LayoutFull: React.FunctionComponent<ILayoutFullProps> = ({
  children,
}) => {
  return (
    <>
      <Header />
      <Container>
        <Main>{children}</Main>
      </Container>
      <Footer />
    </>
  );
};

export default LayoutFull;
