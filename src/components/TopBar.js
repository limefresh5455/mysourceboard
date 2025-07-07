import { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown'

const query = `
{
    footersectionCollection{
      items{
        title      
        facebook
        twitter
        instagram
        body
      }
    }
    }

`;

function TopBar(props) {
  
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
        <section className='bg-primary-top'>
            <div className='container'>
                <div className='row justify-content-between py-3 text-white'>
                    <div className='col-auto'>
                        <p className='d-inline'> <i className="fa fa-envelope"></i> info@example.com</p>
                        <p className='d-inline ms-2'> <i className="fa fa-phone"></i> 123 456-7890</p>
                    </div>
                    <div className='col-auto'>
                    <div className="social-icons"> 
                            <a href={footersectionCollection.facebook}><i className="fa fa-facebook"></i></a>
                            <a href={footersectionCollection.twitter}><i className="fa fa-twitter"></i></a>
                            <a href={footersectionCollection.instagram}><i className="fa fa-instagram"></i></a>
                    </div>
                    </div>
                </div>
            
            </div>
        </section>
    );
}

export default TopBar;