import { useState, useEffect } from "react";


const query = `
{
  menuCollection{
    items{
      name
       slug
    }
  }

}

`;

function Navbar() {   
    const [menuCollection, setmenuCollection] = useState([]);
  
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
  
          setmenuCollection(data.menuCollection.items);
          //console.log(data.menuCollection)
        });
    }, []);
 
    return (

      <>
        <ul className="navbar-nav ms-auto">
            {menuCollection.map((number) =>
                <li className="nav-item">
                    <a className="nav-link" href={number.slug}>{number.name}</a>
                </li>
            )}
       
        </ul>  
        {/* <ul className="navbar-nav ms-auto">
            <li class="nav-item">
                  <a className="nav-link" href="/">Home</a>
                  <a className="nav-link" href="/about-company">About Us</a>
                  <a className="nav-link" href="/work">Work</a>
                  <a className="nav-link" href="/contact">Contact</a>
            </li>
        </ul>   */}
      </>  
    );
}

export default Navbar;