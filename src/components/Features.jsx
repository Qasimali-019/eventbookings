import React from 'react';
import './Features.css';

const Features = () => {
  const workflowSteps = [
    {
      number: "1",
      title: "Create",
      desc: "Create an event and add a name, date, tickets and description."
    },
    {
      number: "2",
      title: "Customise",
      desc: "Add personality to your event page with event details, images, videos and more."
    },
    {
      number: "3",
      title: "Promote",
      desc: "Share the event via social media with one click and spread the word via email or in person."
    },
    {
      number: "4",
      title: "Manage",
      desc: "Generate sales with early-bird discounts, coupons and group ticketing features, and more."
    },
    {
      number: "5",
      title: "Receive",
      desc: "Get paid directly to your bank account according to your schedule."
    }
  ];

  return (
    <section className="highlights-workflow-section">
      {/* Dashboard Highlights Grid */}
      <div className="highlights-container">
        <div className="highlights-grid">
          {/* App Promo Card */}
          <div className="highlight-card app-promo">
            <div className="card-content">
              <h2 className="card-title">Organise on the go <br /> using our app</h2>
              <p className="card-desc">Publish, manage and share events right from your phone with our iOS or Android app.</p>
              <div className="store-badges">
                <img src="/faetures1.png" alt="Google Play" className="store-badge" />
                <img src="/app-store.png" alt="App Store" className="store-badge" />
              </div>
            </div>
            <div className="app-image-wrapper">
              <img src="/app-preview.png" alt="App Preview" className="app-preview" />
            </div>
          </div>

          <div className="highlights-right-column">
            {/* Payment Card */}
            <div className="highlight-card payment-card">
              <div className="card-content">
                <h3 className="card-title-sm">Get paid fast</h3>
                <p className="card-desc-sm">Your revenue your funds when you need it — even before your events take place.</p>
                <a href="#" className="card-link">Get Started &rarr;</a>
              </div>
              <div className="payment-ui-wrapper">
                <img src="/faetures2.png" alt="Payment UI" className="payment-ui" />
              </div>
            </div>

            {/* Support Card */}
            <div className="highlight-card support-card">
              <div className="card-content">
                <h3 className="card-title-sm">Dedicated support</h3>
                <p className="card-desc-sm">Our dedicated team is always ready to answer your questions.</p>
                <a href="#" className="card-link">Get Started &rarr;</a>
              </div>
              <div className="support-image-wrapper">
                <img src="/support_illustration.png" alt="Dedicated Support" className="support-image" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How it Works Section */}
      <div className="how-it-works-container">
        <h2 className="workflow-section-title">How it works</h2>
        <div className="workflow-content">
          <div className="workflow-image-wrapper">
            <img src="/1.png" alt="Workflow Setup" className="workflow-image" />
          </div>
          <div className="workflow-steps">
            {workflowSteps.map((step, index) => (
              <div key={index} className="workflow-step">
                <div className="step-number">{step.number}</div>
                <div className="step-text">
                  <h4 className="step-title">{step.title}</h4>
                  <p className="step-desc">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
