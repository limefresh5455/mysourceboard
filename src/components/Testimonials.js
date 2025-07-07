import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css'; 
import { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown'

const query = `
{
    testimonialsCollection{
        items{
          profileimage{
            url
          }
          name
          designation          
          body
        }
      }    
    
} 

`;

function Testimonials(props) {

    const [testimonialsCollection, settestimonialsCollection] = useState([]); 

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
            
            settestimonialsCollection(data.testimonialsCollection.items); 
            console.log(data.testimonialsCollection)              
                
          });
      }, []);

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 1
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items: 1
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 1
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };
    return (
      <>

 
<Carousel responsive={responsive} showDots={true} arrows={false}>
{testimonialsCollection.map((testiCnt) =>
    <div className='project review'>       
        <img src={testiCnt.profileimage.url} className="" alt="logo" />
        <div className=''>
            <h2>{testiCnt.name}</h2>
            <h6>{testiCnt.designation}</h6>
            <p><ReactMarkdown>{testiCnt.body}</ReactMarkdown> </p>
        </div>
    </div>
)}
</Carousel>

      </>
    );
}

export default Testimonials;

