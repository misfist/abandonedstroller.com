import React, { useState, useCallback }  from 'react'
import parse from 'html-react-parser'
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import classNames from 'classnames'
import Gallery from "react-photo-gallery";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app

const GalleryComponent = ( { posts, pageContext } ) => {
  const dateRange = ( dateA, dateB ) => {
    const diffTime = Math.abs( dateA - dateB );
    const diffDays = Math.ceil( diffTime / ( 1000 * 60 * 60 * 24 ) );
    return diffDays;
  }

  const currentDate = new Date();
  const images = posts.filter( post => post.featuredImage.node.localFile != undefined );

  const photos = images.map( photo => {    
    const caption = photo.featuredImage.node.caption ? photo.featuredImage.node.caption : ''
    const strippedCaption = photo.featuredImage.node.caption ? caption.replace(/(<([^>]+)>)/gi, "") : ''
    const photoDate = new Date( photo.dateGmt )
    const diffDays = dateRange( currentDate, photoDate )
    const isNew =  diffDays <= 180
    const isContributed = photo.categories.nodes.some( category => category.slug === 'contributed' );
    const isFeatured = photo.categories.nodes.some( category => category.slug === 'featured' );

    return (
      {
        gatsbyImageData: photo.featuredImage.node.localFile.childImageSharp.gatsbyImageData,
        title: photo.title,
        date: photo.date,
        caption: caption,
        strippedCaption: caption ? `${strippedCaption} - ${photo.date}` : '',
        alt: photo.title,
        src: photo.featuredImage.node.localFile.childImageSharp.fluid.src,
        sizes: photo.featuredImage.node.localFile.childImageSharp.fluid.sizes,
        srcSet: photo.featuredImage.node.localFile.childImageSharp.fluid.srcSet,
        height: photo.featuredImage.node.localFile.childImageSharp.gatsbyImageData.height,
        width: photo.featuredImage.node.localFile.childImageSharp.gatsbyImageData.width,
        isSticky: photo.isSticky,
        isFeatured: isFeatured,
        isNew: isNew,
        isContributed: isContributed,
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
    <article className="gallery section-inner">
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
               'is-featured': photo.isFeatured,
               'is-contributed': photo.isContributed,
               'is-new': photo.isNew
              }
            );
            const getAriaLabel = () => {
              let label = photo.title;
              if( photo.isContributed ) {
                label = `Contributed Photo`
              }
              else if( photo.isNew ) {
                label = `New Photo`
              }
              else if( photo.isFeatured ) {
                label = `Featured Photo`
              }
              return ( label )
            }
            const ariaLabel = getAriaLabel()
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
                aria-label={ariaLabel}
                onClick={ ( event ) => {
                  openLightbox( photo, index )
                } }
              >
                <GatsbyImage 
                  image={photo.gatsbyImageData}
                  alt={photo.title}
                  direction={"column"}
                  aria-label={ariaLabel}
                />
                <figcaption className="bottom-right overlay-text">
                    <span className="title">{photo.title}</span>
                    <span className="caption">{parse( photo.caption )} </span>
                    <span className="date" data-date><time dateTime={photo.dateGmt}>{photo.date}</time></span>
                  </figcaption>

                  { photo.isNew && (
                    <div className="new-wrapper">
                      <span className="new"><span className="screen-reader-text">New</span></span>
                    </div>
                  ) }
                  { photo.isContributed && (
                    <div className="contributed-wrapper">
                      <span className="contributed"><span className="screen-reader-text">Contributed</span></span>
                    </div>
                  ) }
                  {/* { photo.isFeatured && (
                  <div className="featured-wrapper">
                    <span className="featured"><span className="screen-reader-text">Featured</span></span>
                  </div>
                  ) } */}
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
            imageCaption={photos[currentImage].strippedCaption}
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