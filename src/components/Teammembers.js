import { useState, useEffect } from "react";

const query = `
{
   teammembersheadingCollection{
      items{
        title
        description
      }
    }
 
  teammembersCollection{
    items{
      image{
        url
      }
      name
      nametitle
      facebook
      twitter
      instagram
    }
    }  

   
}
  

`;

function Teammembers(props) {
  const [teammembersheadingCollection, setteammembersheadingCollection] = useState([]);
  const [teammembersCollection, setteammembersCollection] = useState([]);   
 
  
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
        setteammembersheadingCollection(data.teammembersheadingCollection.items[0]); 
        setteammembersCollection(data.teammembersCollection.items);       

       //console.log(data.blogPostCollection)
           
            
      });
  }, []);
    return (
        <>
            <div className="row">               
                    <div className="col-12">                                     
                            <h2>{teammembersheadingCollection.title}</h2>                            
                            <p>{teammembersheadingCollection.description}</p>

                           
                     </div>
          </div> 

         <div className="row">
                    {teammembersCollection.map((tm) =>
                        <div className="col-4"> 
                           <div className="teamber"> 
                            <div className="mbimage">
                                <img src={tm.image.url} className="" alt="logo" />
                                <div class="social-icons">
                                <a href="#"><i class="fa fa-facebook"></i></a>
                                <a href="#"><i class="fa fa-twitter"></i></a>
                                <a href="#"><i class="fa fa-instagram"></i></a>
                                </div>
                                <div class="overlay"></div>
                            </div>
                           
                            <h5>{tm.name}</h5>
                            <h6>{tm.nametitle}</h6>
                           </div>
                          
                        </div>
                  )}
          </div>         
           
        </>
    );
}
export default Teammembers;

