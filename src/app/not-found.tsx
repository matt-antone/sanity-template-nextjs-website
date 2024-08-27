import Container from "@/components/Container";
import * as React from "react";
import LayoutHeading from "@/components/LayoutHeading";
interface INotFoundProps {}

const NotFound: React.FunctionComponent<INotFoundProps> = (props) => {
  return (
    <Container>
      <LayoutHeading text="404 Error: Page Not Found" />
        <div className="prose">
          <p>The page you requested could not be found.</p>
        </div>
    </Container>
  );
};

export default NotFound;
