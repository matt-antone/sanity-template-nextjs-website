import * as React from 'react';
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "700", "900"] });

interface IFontsProps {
  children: React.ReactNode
}

const Fonts: React.FunctionComponent<IFontsProps> = ({children}) => {
  return <div className={inter.className}>{children}</div>;
};

export default Fonts;
