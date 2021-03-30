import React, { useState, useCallback }  from 'react'
import parse from 'html-react-parser'
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import classNames from 'classnames'
import Gallery from "react-photo-gallery";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app

const GalleryComponent = ( { posts, pageContext } ) => {
  const images = posts.filter( post => post.featuredImage.node.localFile != undefined  );

  const photos = images.map( photo => {    
    const caption = photo.featuredImage.node.caption ? photo.featuredImage.node.caption : ''
    return (
      {
        gatsbyImageData: photo.featuredImage.node.localFile.childImageSharp.gatsbyImageData,
        title: photo.title,
        caption: caption,
        alt: photo.title,
        src: photo.featuredImage.node.localFile.childImageSharp.fluid.src,
        sizes: photo.featuredImage.node.localFile.childImageSharp.fluid.sizes,
        srcSet: photo.featuredImage.node.localFile.childImageSharp.fluid.srcSet,
        height: photo.featuredImage.node.localFile.childImageSharp.gatsbyImageData.height,
        width: photo.featuredImage.node.localFile.childImageSharp.gatsbyImageData.width,
        isSticky: photo.isSticky
      }
    )
  } )

  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = ( photo, index ) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  const moveNextRequest = () => {
    const nextImage = ( currentImage + photos.length - 1) % photos.length;
    setCurrentImage( nextImage );
  }

  const movePrevRequest = () => {
    const prevImage = ( currentImage + 1 ) % photos.length;
    setCurrentImage( prevImage );
  }

  return (
    <article className="gallery">
      <header className="page-header">
        {/* <h1 className="page-title">{title}</h1> */}
      </header>
      <div className={`page-content`}>
        <Gallery 
          photos={photos}
          renderImage={({ photo, index, margin, direction, top, left }) => {
            const classes = classNames(
              'image-item',
              {
               ' is-sticky': photo.isSticky
              }
            );
            return (
              <figure
                className={classes}
                key={`photo-${index}`}
                style={{
                  width: photo.width,
                  height: photo.height,
                  margin,
                  left,
                  top
                }}
                onClick={ ( event ) => {
                  openLightbox( photo, index )
                } }
              >
                <GatsbyImage 
                  image={photo.gatsbyImageData}
                  alt={photo.title}
                  direction={"column"}
                />
                <figcaption className="bottom-right overlay-text">
                    <span className="title">{photo.title}</span>
                    <span className="caption">{parse( photo.caption )} </span>
                  </figcaption>

                  { photo.isSticky && (
                  <div className="star-wrapper">
                    <span className="star"></span>
                  </div>
                  ) }
              </figure>
              
            )
          }}
        />
        {viewerIsOpen && (
          <Lightbox
            mainSrc={photos[currentImage].src}
            nextSrc={photos[(currentImage + 1) % photos.length].src}
            prevSrc={photos[(currentImage + photos.length - 1) % photos.length].src}
            imageTitle={photos[currentImage].title}
            imageCaption={photos[currentImage].caption}
            onCloseRequest={closeLightbox}
            onMovePrevRequest={movePrevRequest}
            onMoveNextRequest={moveNextRequest}
            enableZoom={false}
          />
        )}
        
      </div>
    </article>
  )
}

export default GalleryComponent;
