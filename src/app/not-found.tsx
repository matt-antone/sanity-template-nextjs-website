import Container from "@/src/components/Container";
import * as React from "react";
import LayoutHeading from "../../components/LayoutHeading";
import ContentLayout from "../../components/ContentLayout";

interface INotFoundProps {}

const NotFound: React.FunctionComponent<INotFoundProps> = (props) => {
  return (
    <Container>
      <LayoutHeading text="404 Error: Page Not Found" />
      <ContentLayout widgets={null}>
        <div className="prose">
          <p>The page you requested could not be found.</p>
        </div>
      </ContentLayout>
    </Container>
  );
};

export default NotFound;
