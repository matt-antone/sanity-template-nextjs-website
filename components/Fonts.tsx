import * as React from 'react';
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "700"],
});

interface IFontsProps {
  children: React.ReactNode
}

const Fonts: React.FunctionComponent<IFontsProps> = ({children}) => {
  return <div className={montserrat.className}>{children}</div>;
};

export default Fonts;
