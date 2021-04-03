import React, { useState } from "react";
import { graphql, useStaticQuery } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image"
// import Gallery from 'react-grid-gallery';

const Images = ( { images } ) => {
  // Constructs the data for our grid items
  const [items] = useState(() => {
    images.map( item => {
      const image = getImage( item.localFile );
      return (
        {
          ...image,
          alt: item.title
        }
      )
    } );
  }
  );

  return (
    <main className={style("container")}>
      <div className={style("masonic")}>
        <Masonry
          items={items}
          columnGutter={12}
          columnWidth={300}
          overscanBy={5}
          render={Card}
        />
      </div>
      <Header />
    </main>
  );
};

const Card = ( { data : { image, alt } } ) => (
  <div className={style("card")}>
    <GatsbyImage image={image} />
    {/* <img className={style("img")} alt="kitty" src={src} /> */}
    {/* <span children={name} /> */}
  </div>
);

export default Images;