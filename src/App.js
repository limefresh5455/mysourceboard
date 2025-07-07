import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import TopBar from "./components/TopBar";
import Home from "./pages/Home";
import About from "./pages/About"
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Work from "./pages/Work";
import Contact from "./pages/Contact"


const query = `
{
  pageCollection {
    items {
      title
      logo {
        url
      }
    }
  }

  kitchenAboutSectionCollection{
    items{
      title
      content
      
    }
  }

}

`;

function App() {
  const [page, setPage] = useState(null);
  const [kitchenAboutSectionCollection, setkitchenAboutSectionCollection] = useState(null); 

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
        

        setPage(data.pageCollection.items[0]);
        setkitchenAboutSectionCollection(data.kitchenAboutSectionCollection.items[0]);      
      });
  }, []);

  if (!page) {
    return "Loading...";
  }

  // render the fetched Contentful data
  return (
    <>
    {/* <TopBar />  
    <div className="container">
         
      <nav className="navbar navbar-expand-sm">
        <div className="container-fluid">
          <a className="navbar-brand" href="#"> <img src={page.logo.url} className="" alt="logo" /></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="collapsibleNavbar">
             <Navbar />
          </div>
        </div>
      </nav>        

        
     
    </div> */}
  
    <div className="">
        <Router>
          
            <Routes>
              <Route exact path="/" element={<Home/>} />
              <Route path="/about-company" element={<About/>} />
              <Route path="/work" element={<Work/>} />
              <Route path="/contact" element={<Contact/>} />
            </Routes>
          </Router>  
    </div>


    

    {/* <footer className="footer">
    <div className="container text-center">
      <Footer />
    </div>
    </footer> */}


  
    </>
  );
}

export default App;