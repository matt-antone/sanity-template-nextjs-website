import * as React from 'react';
import Image from 'next/image';
import Container from './Container';

interface ICarousel3dProps {
  title: string;
  gallery: {}[];
}

  /**
   * A 3D carousel component for displaying a list of images.
   *
   * @param {string} title - The title of the carousel.
   * @param {object[]} gallery - An array of objects containing the image assets.
   *                            Each object should have an `asset` property with
   *                            a sanity image asset as its value.
   * @returns A JSX element representing the 3D carousel.
   */
const Carousel3d: React.FunctionComponent<ICarousel3dProps> = ({ title, gallery }) => {
  return gallery && (
    <div className="max-w-screen overflow-hidden">
      <h1 className="text-[5rem] md:text-[6rem] lg:text-[10rem] xl:text-[12rem] 2xl:text-[15rem] font-black relative z-50 mt-10 text-center leading-none uppercase drop-shadow-lg">
        {title}
      </h1>
  
      <div className="relative flex items-center justify-center mb-16 h-[30vw]">
        <div
          className={
            "gallery3d flex justify-center items-center relative z-50 h-auto"
          }
        >
          <div
            className={
              "slider flex justify-center " +
              "w-[50px] h-[50px] sm:w-[100px] sm:h-[100px] md:w-[150px] md:h-[150px] lg:w-[175px] lg:h-[175px] xl:w-[270px] xl:h-[270px]" +
              ""
            }
          >
            {gallery.reverse().map((image: any, i: number) => {
              const count = gallery.length;
              const rotateY = Math.floor(i * (360 / count));
              const styles = {
                "--rotateY": `${rotateY}deg`,
              } as React.CSSProperties;
              return (
                image.asset && (
                  <div
                    className="item z-10 flex justify-center items-center item w-[60px] h-[60px] sm:w-[100px] sm:h-[100px] md:w-[150px] md:h-[150px] lg:w-[175px] lg:h-[175px] xl:w-[270px] xl:h-[270px] bg-gray-800"
                    key={image._key}
                    style={styles}
                  >
                    <div className="item-inner p-[2px] flex justify-center items-center absolute inset-[1px]">
                      <div className="absolute inset-0 z-50">
                        <Image
                          src={`${image.asset.url}?w=500&h=500&fit=crop&dpr=2`}
                          alt={image.asset.altText}
                          width={500}
                          height={500}
                          className="block hover:scale-125 transition-all"
                        />
                      </div>
                    </div>
                    <hr className="w-[200vw]s border-green-700" />
                    {/* <caption className="py-2 text-left text-white text-xs bg-black">{image.asset.altText}{`${rotateY}deg`}</caption> */}
                  </div>
                )
              );
            })}
          </div>
          s{" "}
        </div>
        {/* <Image
          src="https://cdn.sanity.io/images/6eag1k58/production/ca4eafb52a6b350ee58ce7c206cc9c97deae0be3-3024x3024.jpg"
          alt="logo"
          width={1200}
          height={1200}
          className="w-full object-cover opacity-30 absolute inset-0"
        /> */}
      </div>
    </div>
  )};

export default Carousel3d;
