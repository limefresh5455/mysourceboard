import { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown'

const query = `
{
    footersectionCollection{
      items{
        title
        description
        facebook
        twitter
        instagram
        body
      }
    }
    }

`;

function Footer(props) {
  
  const [footersectionCollection, setfootersectionCollection] = useState([]);   
   
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
       
        setfootersectionCollection(data.footersectionCollection.items[0]);
        //console.log(data.footersectionCollection)
           
            
      });
  }, []);
    return (
        <>  
        
          <div className="row justify-content-center">               
                    <div className="col-6">   
                          <div className="social-icons mb-3">                            
                            <h2>{footersectionCollection.title}</h2>
                            <p>{footersectionCollection.description}</p> 
                            <a href={footersectionCollection.facebook}><i className="fa fa-facebook"></i></a>
                            <a href={footersectionCollection.twitter}><i className="fa fa-twitter"></i></a>
                            <a href={footersectionCollection.instagram}><i className="fa fa-instagram"></i></a>
                          </div>
                          <ReactMarkdown>{footersectionCollection.body}</ReactMarkdown>        
                     </div>
          </div> 

          <div className="row justify-content-center footer-bottom ">               
                    <div className="col-6">
                    <p class="mb-0">Copyright Thibert 2022. All rights Reserved</p>   
                    </div>
          </div>

       
        </>
    );
}
export default Footer;
