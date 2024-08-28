"use client";
import * as React from "react";
import Container from "@/components/Container";
import LayoutHeading from "@/components/LayoutHeading";

interface IErrorProps {}

const Error: React.FunctionComponent<IErrorProps> = (props) => {
  return (
    <Container>
      <LayoutHeading text="500 Error: Server Error" />
      <div className="prose">
        <p>The was an issue loading this page.</p>
      </div>
    </Container>
  );
};

export default Error;
