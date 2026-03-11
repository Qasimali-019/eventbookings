import React from 'react';
import './Industry.css';

const industries = [
  { name: "Business", img: "/1.png", size: "large" },
  { name: "Academic", img: "/1.png", size: "small" },
  { name: "Councils", img: "/1.png", size: "medium" },
  { name: "Charity", img: "/1.png", size: "small" },
  { name: "Communities", img: "/1.png", size: "small" },
  { name: "Entertainment", img: "/1.png", size: "medium" },
  { name: "Sporting Club", img: "/1.png", size: "large" },
  { name: "Cultural", img: "/1.png", size: "small" }
];

const Industry = () => {
  return (
    <section className="industry-showcase-section">
      <div className="industry-showcase-container">
        <div className="industry-header">
          <h2 className="industry-title">Trusted by industries like yours</h2>
          <p className="industry-desc">
            Our online event ticketing platform can be used for managing any kind of event in just about any industry.
          </p>
        </div>

        <div className="industry-mosaic-grid">
          {industries.map((item, index) => (
            <div key={index} className={`industry-card card-${item.size}`}>
              <img src={item.img} alt={item.name} className="industry-card-img" />
              <div className="industry-card-label">
                {item.name} <span>&rarr;</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Industry;
