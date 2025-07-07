import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css'; 
import { useState, useEffect } from "react";

const query = `
{
    projectsliderheadingCollection{
      items{
        title
        description
      }
    }

    projectsliderCollection{
      items{
        image{
          url
        }
        title
        subtitle
      }
    }
    
} 

`;

function ProjectSlider(props) {

    const [projectsliderheadingCollection, setprojectsliderheadingCollection] = useState([]);
    const [projectsliderCollection, setprojectsliderCollection] = useState([]); 

    useEffect(() => {
        window
          .fetch(`https://graphql.contentful.com/content/v1/spaces/b1m86aj20dkm/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer ccmbNsq1D4tRxk7PTH83nQPAt0F0EbZdwtTh8V1O5w8",
            },
            body: JSON.stringify({ query }),
          })
          .then((response) => response.json())
          .then(({ data, errors }) => {
            if (errors) {
              console.error(errors);
            }
            
            setprojectsliderheadingCollection(data.projectsliderheadingCollection.items[0]); 
            setprojectsliderCollection(data.projectsliderCollection.items);               
                
          });
      }, []);

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
    return (
      <>
<div className="intro">
            <div className="row mb-4">               
                    <div className="col-12">                                     
                            <h2>{projectsliderheadingCollection.title}</h2>
                            <p>{projectsliderheadingCollection.description}</p>
                     </div>
            </div> 
</div>
 
<Carousel responsive={responsive} showDots={true}>
{projectsliderCollection.map((projectsldr) =>
    <div className='project'>
        <div class="overlay"></div>
        <img src={projectsldr.image.url} className="" alt="logo" />
        <div className='content1'>
            <h2>{projectsldr.title}</h2>
            <h6>{projectsldr.subtitle}</h6>
        </div>
    </div>
)}
</Carousel>

      </>
    );
}

export default ProjectSlider;