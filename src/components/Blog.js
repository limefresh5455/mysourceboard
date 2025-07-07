import { useState, useEffect } from "react";

const query = `
{
       
    blogPostCollection(limit: 3){
        items{
            heroImage{
                url
              } 
          title           
          description
          body
          tags
          publishDate      
        }
    }

    blogpostheadingCollection{
        items{
          title
          description
        }
    }
   
}  

`;

function Blog(props) {
  
  const [blogPostCollection, setblogPostCollection] = useState([]);
  const [blogpostheadingCollection, setblogpostheadingCollection] = useState([]);
   
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
        setblogPostCollection(data.blogPostCollection.items); 
        setblogpostheadingCollection(data.blogpostheadingCollection.items[0]);

        console.log(data.blogpostheadingCollection)
           
            
      });
  }, []);
    return (
        <>  
          <div className="row">               
                    <div className="col-12">                                     
                            <h2>{blogpostheadingCollection.title}</h2>                            
                            <p>{blogpostheadingCollection.description}</p>                           
                     </div>
          </div> 

          <div className="row mt-5">                           

                    {blogPostCollection.map((blgdta) =>                    
                        <div className="col-4">
                           <div className="teamber blog">  
                           <div className="mbimage">
                                <img src={blgdta.heroImage.url} className="" alt="logo" />
                                <h6>{blgdta.tags}</h6>
                            </div> 
                            <span className="date">{blgdta.publishDate}</span>                                                   
                            <h5>{blgdta.title}</h5>                            
                            <p>{blgdta.description}</p>                            
                           </div>                          
                        </div>
                  )}
          </div>
        </>
    );
}
export default Blog;

