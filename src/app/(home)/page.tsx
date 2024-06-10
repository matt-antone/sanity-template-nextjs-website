import type { Metadata } from "next";
import Container from "@/src/components/Container";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to our site.",
};

export default async function Page() {
  // Load home page
  
  return (
    <Container>
      Home
    </Container>
  );
}
