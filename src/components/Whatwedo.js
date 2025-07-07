import { useState, useEffect } from "react";

const query = `
{
    whatWeDoSectionColumsCollection{
      items{
        image{
          url
          title
          description
        }
        title
        description
      }
    }

    whatWeDoSectionCollection{
      items{
        title
        subtitle
        description
      }
    }
      
  }
  
  

`;

function Whatwedo(props) {
  const [whatWeDoSectionCollection, setwhatWeDoSectionCollection] = useState([]);
  const [whatWeDoSectionColumsCollection, setwhatWeDoSectionColumsCollection] = useState([]); 
 
  
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
        setwhatWeDoSectionCollection(data.whatWeDoSectionCollection.items[0]); 
        setwhatWeDoSectionColumsCollection(data.whatWeDoSectionColumsCollection.items); 
           
            
      });
  }, []);
    return (
        <>
            <div className="row">               
                    <div className="col-12">                                     
                            <h3>{whatWeDoSectionCollection.title}</h3>
                            <h2>{whatWeDoSectionCollection.subtitle}</h2>
                            <p>{whatWeDoSectionCollection.description}</p>
                     </div>
          </div> 

         <div className="row">
                    {whatWeDoSectionColumsCollection.map((wwdf4) =>
                        <div className="col-4"> 
                           <div className="service"> 
                            <div className="">
                                <img src={wwdf4.image.url} className="" alt="logo" />
                            </div>
                           
                            <h5>{wwdf4.title}</h5>
                            <p>{wwdf4.description}</p>
                           </div>
                          
                        </div>
                  )}
          </div> 
           
        </>
    );
}
export default Whatwedo;


