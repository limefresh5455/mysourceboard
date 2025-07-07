import { useState, useEffect } from "react";

const query = `
{
    heroBannerCollection {
      items {     
          bannerTitle
          bannerSubTItle
            backgroundImage {
              title
              description
              contentType
              fileName
              size
              url
              width
              height
            } 
       
      }
    }
  }

`;

function HeroSection(props) {
  const [heroBannerCollection, setheroBannerCollection] = useState([]);
  
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
        setheroBannerCollection(data.heroBannerCollection.items[0]);  
        //console.log(data.heroBannerCollection)     
            
      });
  }, []);
    return (
        <header className="App-header"> 
           <div className="bannerContent">
                <h1>{heroBannerCollection.bannerTitle}</h1>
                <h2>{heroBannerCollection.bannerSubTItle}</h2> 
          </div>
            <div className="bannerContentWrap">
                <img src={heroBannerCollection.backgroundImage?.url} alt="logo" />
            </div>
        </header>
    );
}
export default HeroSection;