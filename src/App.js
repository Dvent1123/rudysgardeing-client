import Layout from './core/Layout'
import gallery_image1 from './assets/images/Gallery_Image1-min.png'
import gallery_image2 from './assets/images/Gallery_Image2-min.png'
import gallery_image3 from './assets/images/Gallery_Image3-min.png'
import gallery_image4 from './assets/images/Gallery_Image4-min.png'
import gallery_image5 from './assets/images/Gallery_Image5-min.png'
import gallery_image6 from './assets/images/Image_4-min.png'
import gallery_image7 from './assets/images/ProjectCover-min.png'
import gallery_image8 from './assets/images/Gallery_image8-min.png'
import gallery_image9 from './assets/images/Gallery_image9-min.png'
import mission_image from './assets/images/features-min.png'
import gallery_image10 from './assets/images/Gallery_image10-min.png'
import gallery_image11 from './assets/images/Gallery_image11-min.png'
import banner_image from './assets/images/banner-min.png'
import shrub from './assets/images/shrub.svg'
import plant from './assets/images/plant.svg'
import plant_logo from './assets/images/plant_logo.svg'
import logo from './assets/images/logo.png'


function App() {
  return (
      <div className="wrapper">
        <div className="container">
          <div className="nav-container">
            <div className="logo-container">
              <img src={logo} alt="logo" />
            </div>
              <nav>
                <ul className="nav-items">
                  <li className="nav-item">About us</li>
                  <li className="nav-item">Our Services</li>
                  <li className="nav-item">Pricing</li>
                  <li className="nav-item">Login</li>
                  <li className="nav-item">Register</li>
                  <li className="nav-item" id="subscribe">Subscribe</li>
                </ul>
              </nav>
          </div>
          <section className='banner'>
            <div className="banner-wrapper">
              <div className="banner-container">
                <div className="banner-text">
                  <h1>Life's a garden, can you dig it</h1>
                  <button>Subscribe</button>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="mission-container">
          <div className="left-image">
              <img src={shrub} alt="shrub svg" />
          </div>
          <section className="mission">
            <div className="mission-image-container">
              <img src={mission_image} alt="trimming-shrubs" />
            </div>
            <div className="mission-content">
              <h2>Mission Statement</h2>
              <h4>We are committed to providing communities with a sustainable landscape. 
                We will provide the community with a rich soil structure one home at a time.</h4>
                <p>Life's a garden, can you dig it</p>
            </div>
          </section>
        </div>
        <div className="container">
          <section className="our-services">
              <h2>Our Services</h2>
              <div className="services-container">
                <div className="services-image-1">
                  {/* <img src={gallery_image5} alt="forest"/> */}
                    <h4>Tree trimming</h4>
                    <h5>$75-$250</h5>
                </div>
                <div className="services-image-2">
                  {/* <img src={gallery_image8} alt="irrigation" /> */}
                  <h4>Irrigation</h4>
                  <h5>$55 an hour</h5>
                </div>
                <div className="services-image-3">
                  {/* <img src={gallery_image1} alt="lawnmower" /> */}
                  <h4>Trimming</h4>
                  <h5>$55 an hour</h5>
                </div>
                <div className="services-image-4">
                  {/* <img src={gallery_image7} alt="sprinklers" /> */}
                  <h4>Irrigation valve service</h4>
                  <h5>$160</h5>
                </div>
                <div className="services-image-5">
                  {/* <img src={gallery_image10} alt="maintenace" /> */}
                  <h4>Monthly Maintenance</h4>
                  <h5>$85-$400 per month</h5>
                </div>
                <div className="services-image-6">
                  {/* <img src={gallery_image9} alt="fabrication" /> */}
                  <h4>Fabrication</h4>
                  <h5>$85 per hour</h5>
                </div>
                <div className="services-image-7">
                  {/* <img src={gallery_image11} alt="hardscrape" /> */}
                  <h4>Hard Scrape</h4>
                  <h5>$8-$12 per foot</h5>
                </div>
              </div>
          </section>
          <section className="subscribe">
            <div className="subsribe-container">
              <div className="subscribe-content">
                <h3>Subscribe to our Newsletter <br /> and get updates!</h3>
                <form className='subscribe-form'>
                    <div className='email-input'>
                      <input type="email" placeholder="Email Address..."/>
                    </div>
                    <div className='sub-btn-container'>
                      <button className='sub-button'>
                        Subscribe
                      </button>
                    </div>
                </form>
              </div>
              <div className="subscribe-image">
                <img src={plant} alt="plant" />
              </div>
            </div>
          </section>
          <section className="hard-scrape-wrapper">
            <div className="hard-scrape-container">
              <div className="hard-scrape-images">
                <div className="scrape-image-2"></div>
                <div className="scrape-image-4"></div>
                <div className="scrape-image-3"></div>
                <div className="scrape-image-6"></div>
              </div>
              <div className="hard-scrape-content-container">
                <div className="hard-scrape-text">
                  <h4>Hard Scrape Service</h4>
                  <p>Our landscaping services offer implementation of the following types of features:</p>
                  <ul>
                    <li>Customized outdoor lighting</li>
                  </ul>
                  <ul>
                    <li>Plants, trees, vegetation, and shrubbery</li>
                  </ul>
                  <ul>
                    <li>Seasonal garden beds</li>
                  </ul>
                  <ul>
                    <li>Fountains and Ponds</li>
                  </ul>
                  <ul>
                    <li>Patios and Decks</li>
                  </ul>
                  <ul>
                    <li>Fence Installation</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          <section className="contact">
            <div className="contact-container">
              <div className="contact-text">
                <h3>Are you ready to transform your <br /> outdoor space?</h3>
              </div>
              <div className="contact-at">
                  <h5>Contact us at : (123)456-7891</h5>
              </div>
            </div>
          </section>
          <section className="footer">
            <footer>
              <div className="footer-logo">
                <img src={logo} alt="logo" />
              </div>
              <ul className="footer-items">
                  <li className="footer-item">About us</li>
                  <li className="footer-item">Our Services</li>
                  <li className="footer-item">Pricing</li>
                </ul>
            </footer>
          </section>
        </div>
      </div>
    )
}

export default App;
