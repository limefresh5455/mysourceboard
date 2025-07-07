import { useState, useEffect } from "react";
import HeroSection from "../components/HeroSection";
import Counter from "../components/Counter";
import Whatwedo from "../components/Whatwedo";
import ProjectSlider from "../components/ProjectSlider";
import Teammembers from "../components/Teammembers";
import Testimonials from "../components/Testimonials";
import Blog from "../components/Blog";
import Pricing from "../components/Pricing";
import Source from "../components/Source";

const query = `
{
  kitchenAboutSectionCollection{
    items{
      title
      content
      
    }
  }

  midSection1Collection{
    items{
      title
      content
       leftIcons{
        description
        url
      }
    }
  }

  midSection1RightImageCollection{
    items{
      midRightBigImage{
        url
      }
    }
  }


}

`;

function Home(props) {
    const [kitchenAboutSectionCollection, setkitchenAboutSectionCollection] = useState('');
    const [midSection1Collection, setmidSection1Collection] = useState([]);
    const [midSection1RightImageCollection, setmidSection1RightImageCollection] = useState([]); 
   
  
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
      
        setkitchenAboutSectionCollection(data.kitchenAboutSectionCollection.items[0]);
        setmidSection1Collection(data.midSection1Collection.items);
        setmidSection1RightImageCollection(data.midSection1RightImageCollection.items); 
          
        
      
      });
  }, []);

  //console.log(kitchenAboutSectionCollection)

    return (
      
      <>
          {/* <HeroSection />
          <div className="container aboutussect">
              <h2>{kitchenAboutSectionCollection.title}</h2>
              <p>
              {kitchenAboutSectionCollection.content}
              </p>
          </div>

          <div className="container">
            <div className="row my-5">
              <div className="col-7">
                <div className="row">
                {midSection1Collection.map((student) =>
                  <div className="col-12"> 
                    <div className="midwrap"> 
                      <div className="">
                      <img src={student.leftIcons.url} className="bannerimg" alt="logo" />
                      </div>
                      <div className="">
                      <h2>{student.title}</h2>
                      <p>{student.content}</p>
                      </div>                                     
                 
                    </div>
                  </div>
                  )}
                </div>
              </div>
              <div className="col-5">
              {midSection1RightImageCollection.map((studentprofile) =>
                 <div><img src={studentprofile.midRightBigImage?.url} className="bannerimg" alt="logo" /></div>
              )}
              </div>
            </div>
          </div>  */}

          
       
          {/* <div className="countersection">
            <div className="container">
              <Counter />
            </div>
          </div>

          <div className="intro">
      <div className="container">
        <Whatwedo />
      </div>
    </div>

    <div className="container">
      <ProjectSlider />
    </div>

    <div className="intro mb-5">
      <div className="container">
        <Teammembers />
      </div>
    </div>

    <div className="testimn mb-5">
      <div className="container">
        <Testimonials />
      </div>
    </div>

    <div className="intro mb-5">
      <div className="container">
        <Blog />
      </div>
    </div> */}

    <div className="intro mb-5">
      <div className="container">
        <Pricing />
      </div>
    </div>

    {/* <div className="intro mb-5">
      <div className="container">
        <Source />
      </div>
    </div> */}

        </>
    );
}

export default Home;