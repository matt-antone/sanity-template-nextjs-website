import type { Metadata } from "next";
import LayoutHeading from "@/components/LayoutHeading";
import Container from "@/components/Container";
import LayoutPostsAlgolia from "@/components/LayoutPostsAlgolia";

export const metadata: Metadata = {
  title: "Posts",
  description: "Our latest posts.",
};

export default async function Page() {
  return (
    <Container>
      <LayoutHeading text="Posts"/>
      <LayoutPostsAlgolia/>    
    </Container>
  );
}
