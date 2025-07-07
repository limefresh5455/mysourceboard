import React, { useState, useEffect } from "react";

const query = `
{
    innerBannerCollection{
        total
            items{
            title
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
    },

    contentCollection{
        total
            items{
              content{
                json
              }
            }   
      }
    
}

`;

function About(props) {
    const [innerBannerCollection, setInnerBannerCollection] = useState([]);
    const [contentCollection, setContentCollection] = useState([]);

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
                setInnerBannerCollection(data.innerBannerCollection.items[0]);
                setContentCollection(data.contentCollection.items); // Set content collection
            });
    }, []);

    return (
        <>
            <header className="App-header">
                <div className="bannerContent">
                    <h1>{innerBannerCollection.title}</h1>
                </div>
                <div className="bannerContentWrap">
                    <img src={innerBannerCollection.backgroundImage?.url} alt="logo" />
                </div>
            </header>

            <section className="my-5">
                <div className="container">
                    <h2>{innerBannerCollection.title}</h2>                    
                    {contentCollection.map((item, index) => (
                        <p key={index}>{item.content.json.content[0].content[0].value}</p>
                    ))}
                </div>
            </section>
        </>
    );
}

export default About;
