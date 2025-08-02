import React from 'react';
import { assets } from '../assets/assets';  // Adjust the path if needed
import '../styles/css/style.css';
import '../styles/css/bootstrap.css';

const WhyUsSection = () => {
  return (
    <div>
      {/* Why Choose Us Section */}
      <section className="why_us_section layout_padding">
        <div className="container">
          <div className="heading_container heading_center">
            <h2>Why Choose Us</h2>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div className="box">
                <div className="img-box">
                  <img src={assets.w1} alt="Verified Listings" />
                </div>
                <div className="detail-box">
                  <h5>Verified Listings</h5>
                  <p>All properties are verified and legally compliant to ensure a hassle-free purchase.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="box">
                <div className="img-box">
                  <img src={assets.w2} alt="Affordable Pricing" />
                </div>
                <div className="detail-box">
                  <h5>Affordable Pricing</h5>
                  <p>Get the best deals on houses with transparent pricing and no hidden charges.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="box">
                <div className="img-box">
                  <img src={assets.w3} alt="Best Quality" />
                </div>
                <div className="detail-box">
                  <h5>Prime Locations</h5>
                  <p>Find properties in top-rated neighborhoods with high growth potential.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="client_section layout_padding">
        <div className="container">
          <div className="heading_container heading_center">
            <h2>What Our Clients Say</h2>
          </div>
        </div>
        <div className="client_container">
          <div id="carouselExample2Controls" className="carousel slide" data-ride="carousel">
            <div className="carousel-inner">
              {/* Carousel Item 1 */}
              <div className="carousel-item active">
                <div className="container">
                  <div className="box">
                    <div className="detail-box">
                      <p>
                        <i className="fa fa-quote-left" aria-hidden="true"></i>
                      </p>
                      <p>
                        I found my dream home through this platform. The verified listings made the process smooth and stress-free.
                      </p>
                    </div>
                    <div className="client-id">
                      <div className="img-box">
                        <img src={assets.client} alt="Client" />
                      </div>
                      <div className="name">
                        <h5>Rahul Sharma</h5>
                        <h6>Homebuyer</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Carousel Item 2 */}
              <div className="carousel-item">
                <div className="container">
                  <div className="box">
                    <div className="detail-box">
                      <p>
                        <i className="fa fa-quote-left" aria-hidden="true"></i>
                      </p>
                      <p>
                        Selling my property was quick and easy. The team provided great support throughout the process.
                      </p>
                    </div>
                    <div className="client-id">
                      <div className="img-box">
                        <img src={assets.client} alt="Client" />
                      </div>
                      <div className="name">
                        <h5>Neha Kapoor</h5>
                        <h6>Property Seller</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Carousel Item 3 */}
              <div className="carousel-item">
                <div className="container">
                  <div className="box">
                    <div className="detail-box">
                      <p>
                        <i className="fa fa-quote-left" aria-hidden="true"></i>
                      </p>
                      <p>
                        A seamless experience! I found a great investment property at a reasonable price.
                      </p>
                    </div>
                    <div className="client-id">
                      <div className="img-box">
                        <img src={assets.client} alt="Client" />
                      </div>
                      <div className="name">
                        <h5>Amit Verma</h5>
                        <h6>Real Estate Investor</h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Carousel Controls */}
            <div className="carousel_btn-box">
              <a className="carousel-control-prev" href="#carouselExample2Controls" role="button" data-slide="prev">
                <span>
                  <i className="fa fa-angle-left" aria-hidden="true"></i>
                </span>
                <span className="sr-only">Previous</span>
              </a>
              <a className="carousel-control-next" href="#carouselExample2Controls" role="button" data-slide="next">
                <span>
                  <i className="fa fa-angle-right" aria-hidden="true"></i>
                </span>
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhyUsSection;
