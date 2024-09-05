import { Image } from "./Image";
import Link from "next/link";
import Player from "@/components/VideoPlayer";

export const components = {
  types: {
    image: ({ value }: any) =>
      value && (
        <div className="not-prose my-12">
          <Image image={value} />
        </div>
      ),
    button: ({ value }: any) => {
      return (
        value?.link && (
          <Link href={value.link} className="not-prose button">
            {value.text}
          </Link>
        )
      );
    },
    embedCode: ({ value }: any) => {
      return (
        value?.code && (
          <div
            className="not-prose aspect-video mx-auto"
            dangerouslySetInnerHTML={{ __html: value.code }}
          />
        )
      );
    },
    youtube: async ({ value }: any) => {
     
      return (
        <div className="not-prose aspect-video mx-auto my-12 max-w-[640px]">
          <Player {...value} />
        </div>
      );
    },
  },

  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      return (
        <a
          href={value.href}
          rel={rel}
          className="not-prose underline underline-offset-2 decoration-yellow decoration-2"
        >
          {children}
        </a>
      );
    },
  },
};
