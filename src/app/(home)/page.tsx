import type { Metadata } from "next";
import LayoutFull from "@/src/components/LayoutFull";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to our site.",
};

export default async function Page() {
  return (
    <LayoutFull>
      Home
    </LayoutFull>
  );
}
