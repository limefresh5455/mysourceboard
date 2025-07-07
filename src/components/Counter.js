import { useState, useEffect } from "react";

const query = `
{
    countsectionCollection{
      items{
        countdata
      }
    }
  }

`;

function Counter(props) {
  const [countsectionCollection, setcountsectionCollection] = useState([]);
  
  
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
        setcountsectionCollection(data.countsectionCollection.items);  
        //console.log(data.heroBannerCollection)     
            
      });
  }, []);
    return (
        
           <div className="conterwrap">
                  

               
                    <div className="row">
                    {countsectionCollection.map((hitcount) =>
                         <div className="col-3">                      
                            <h2>{hitcount.countdata}</h2>
                        </div>
                    )}     
                    </div> 
                         
          </div>
           
      
    );
}
export default Counter;