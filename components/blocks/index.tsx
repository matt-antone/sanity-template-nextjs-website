import { Image } from "./Image";
import Link from "next/link";
export const components = {
  types: {
    image: ({ value }: any) => <Image image={value} />,
    button: ({ value }: any) => {
      return (
        <Link href={value.link} className="not-prose button">
          {value.text}
        </Link>
      );
    },
    embedCode: ({value}:any) => {
      return <div className="not-prose aspect-video mx-auto" dangerouslySetInnerHTML={{ __html: value.code }} />
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
