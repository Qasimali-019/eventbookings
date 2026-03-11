import React, { useState } from 'react';
import './Pricing.css';

const competitors = [
  { name: "Eventbrite", color: "#f05537", fee: "AU$ 1,025", savings: "AU$ 5.00", savingsLabel: "Cost Saved" },
  { name: "Trybooking", color: "#00b4d8", fee: "AU$ 150", savings: "AU$ 900", savingsLabel: "Cost Saved" },
  { name: "Ticketebo", color: "#062127", fee: "AU$ 250", savings: "AU$ 1,250", savingsLabel: "Cost Saved" },
  { name: "Humanitix", color: "#00b4d8", fee: "AU$ 676", savings: "AU$ 3,380", savingsLabel: "Cost Saved" }
];

const faqs = [
  {
    q: "How do I receive payment from my attendees?",
    a: "Your event ticketing is for you and part of event management, and at EventBookings, we strive to give you the best features at the most affordable pricing. We offer you with different payment gateways, payment methods to suit your needs. If you're an Australian organiser, we also offer separate processing with Stripe so you use your Stripe account. If you are an international event organiser, you can choose from PayPal, Stripe and more. You require a verified payment method to receive payouts from your event's sales. Please do not use your personal payment details. You can add multiple payment gateways to receive revenue from ticket sales."
  },
  {
    q: "Is EventBookings really free?",
    a: "Yes, EventBookings is completely free for free events. For paid events, we charge a small per-ticket fee of 30¢ + 2.5% which includes credit card processing fees."
  },
  {
    q: "Does EventBookings charge for free events?",
    a: "No, EventBookings does not charge any fees for free events. You can create and manage free events with zero cost."
  },
  {
    q: "Is there any upfront or monthly costs?",
    a: "No, there are no upfront or monthly costs. EventBookings operates on a pay-per-ticket model, so you only pay when you sell tickets."
  }
];

const Pricing = () => {
  const [isPaid, setIsPaid] = useState(true);
  const [payerIsMe, setPayerIsMe] = useState(true);
  const [ticketPrice, setTicketPrice] = useState(100);
  const [totalTickets, setTotalTickets] = useState(100);
  const [openFaq, setOpenFaq] = useState(0);

  const grossRevenue = ticketPrice * totalTickets;
  const feePerTicket = 0.30 + (ticketPrice * 0.025);
  const totalFees = feePerTicket * totalTickets;
  const payout = grossRevenue - totalFees;

  return (
    <div className="pricing-page">
      {/* Hero Section */}
      <section className="pricing-hero">
        <div className="pricing-hero-content">
          <div className="pricing-hero-left">
            <h1 className="pricing-hero-title">
              The most affordable prices anywhere
            </h1>
            <p className="pricing-hero-bold">No set-up costs, no monthly payments.</p>
            <p className="pricing-hero-desc">
              Low per-ticket transaction fees.<br />
              Sell tickets and keep more of your revenue.
            </p>
            <div className="pricing-hero-btns">
              <button className="btn-pricing-primary">Create Event</button>
              <a href="#" className="btn-pricing-demo">Book a Demo</a>
            </div>
            <div className="pricing-hero-ratings">
              <div className="pricing-rating">
                <span className="pricing-rating-label">Capterra 4.7/5</span>
                <span className="pricing-stars">★★★★★</span>
              </div>
              <div className="pricing-rating">
                <span className="pricing-rating-label">G2 5/5</span>
                <span className="pricing-stars">★★★★★</span>
              </div>
              <div className="pricing-rating">
                <span className="pricing-rating-label">Google 4.7/5</span>
                <span className="pricing-stars">★★★★★</span>
              </div>
            </div>
          </div>
          <div className="pricing-hero-right">
            <div className="pricing-dark-card">
              <div className="pricing-dark-top">
                <span className="pricing-dark-cents">30<sup>¢</sup></span>
                <span className="pricing-dark-plus">+</span>
                <div className="pricing-dark-badge">2.5%</div>
              </div>
              <p className="pricing-dark-label">Per ticket sold</p>
              <p className="pricing-dark-sublabel">Includes credit card processing fees</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="pricing-features-section">
        <div className="pricing-features-container">
          <h2 className="pricing-features-title">Powering 20,000+ event organisers globally</h2>
          <p className="pricing-features-subtitle">
            From intimate gatherings to large-scale events, we provide all the tools you need to sell tickets and manage your events smoothly, all without the complexity or high fees.
          </p>
          <div className="pricing-features-grid">
            {[
              { icon: "📱", title: "Free ticket scanning app", desc: "Check-ins smooth, fast, and completely hassle-free." },
              { icon: "🪑", title: "Seat reservation", desc: "Organise seating layouts, assign seats, and keep track." },
              { icon: "📝", title: "Customisable registration form", desc: "Complete control over attendee details." },
              { icon: "📧", title: "Email customisation", desc: "Customise emails to match your event's style and voice." },
              { icon: "✉️", title: "Free email campaign", desc: "Send event updates without any extra cost." },
              { icon: "👥", title: "Invite people to your event", desc: "Invite guests and track RSVP effortlessly." },
              { icon: "💳", title: "Sell Tickets with Stripe, PayPal & SecurePay", desc: "Accept payments securely via popular processors." },
              { icon: "🎧", title: "Real human support", desc: "Our support team is available 24/7 to help." }
            ].map((f, i) => (
              <div className="pricing-feature-item" key={i}>
                <span className="pricing-feature-icon">{f.icon}</span>
                <div>
                  <h4 className="pricing-feature-name">{f.title}</h4>
                  <p className="pricing-feature-desc">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="pricing-view-all">
            <a href="#">View All Feature →</a>
          </div>
        </div>
      </section>

      {/* Ticket Fee Calculator */}
      <section className="calculator-section">
        <div className="calculator-container">
          <h2 className="calculator-title">Ticket fee calculator</h2>
          <p className="calculator-subtitle">Enter your ticket details to see your full costs.</p>
          <div className="calculator-card">
            <div className="calculator-left">
              <div className="calc-row">
                <label>Is your event paid or free?</label>
                <div className="toggle-group">
                  <button className={`toggle-btn ${isPaid ? 'active' : ''}`} onClick={() => setIsPaid(true)}> Paid</button>
                  <button className={`toggle-btn ${!isPaid ? 'active' : ''}`} onClick={() => setIsPaid(false)}>Free</button>
                </div>
              </div>
              <div className="calc-row">
                <label>Who will pay the ticketing fee?</label>
                <div className="toggle-group">
                  <button className={`toggle-btn ${payerIsMe ? 'active' : ''}`} onClick={() => setPayerIsMe(true)}> I Will</button>
                  <button className={`toggle-btn ${!payerIsMe ? 'active' : ''}`} onClick={() => setPayerIsMe(false)}>Pass on to attendees</button>
                </div>
              </div>
              <div className="calc-row inputs-row">
                <div className="input-group">
                  <label>Ticket price</label>
                  <div className="price-input">
                    <span className="cur">$</span>
                    <input type="number" value={ticketPrice} onChange={e => setTicketPrice(Number(e.target.value))} />
                  </div>
                </div>
                <div className="input-group">
                  <label>Total tickets</label>
                  <input type="number" value={totalTickets} onChange={e => setTotalTickets(Number(e.target.value))} className="tickets-input" />
                </div>
              </div>
            </div>
            <div className="calculator-right">
              <p className="result-label">Your estimated payout</p>
              <h2 className="result-amount">AU$ {payout.toFixed(2)}</h2>
              <div className="result-details">
                <div>
                  <span className="result-sub-label">Total revenue</span>
                  <span className="result-sub-value">AU$ {grossRevenue.toFixed(2)}</span>
                </div>
                <div>
                  <span className="result-sub-label">Total fees</span>
                  <span className="result-sub-value">AU$ {totalFees.toFixed(2)}</span>
                </div>
              </div>
              <p className="result-note">Includes credit card processing fees</p>
            </div>
          </div>
          <div className="calc-cta">
            <button className="btn-pricing-primary">Get Started For Free</button>
          </div>
        </div>
      </section>

      {/* Competitor Comparison */}
      <section className="comparison-section">
        <div className="comparison-container">
          <h2 className="comparison-title">How much money can you really save?</h2>
          <p className="comparison-subtitle">
            There is no cut-as comparison in ticketing and we in the Australian industry. Having a ticket on EventBookings' platform ticketing fee, the number of tickets compared to 4 events per year.
          </p>
          <div className="comparison-list">
            {competitors.map((c, i) => (
              <div className="comparison-row" key={i}>
                <div className="comparison-name" style={{ color: c.color }}>{c.name}</div>
                <div className="comparison-details">
                  <div className="comparison-col">
                    <span className="comp-label">Competitor's Estimated Fee</span>
                    <span className="comp-fee">{c.fee}</span>
                    <span className="comp-sub">Savings per year</span>
                  </div>
                  <div className="comparison-savings">
                    <span className="comp-label">On EventBookings</span>
                    <span className="comp-savings-value">{c.savings}</span>
                    <span className="comp-sub">{c.savingsLabel}</span>
                    <button className="comp-btn">Compare</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="faq-container">
          <h2 className="faq-title">Frequently asked questions</h2>
          <div className="faq-list">
            {faqs.map((faq, i) => (
              <div
                className={`faq-item ${openFaq === i ? 'open' : ''}`}
                key={i}
                onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
              >
                <div className="faq-question">
                  <span>{faq.q}</span>
                  <span className="faq-toggle">{openFaq === i ? '−' : '+'}</span>
                </div>
                {openFaq === i && (
                  <div className="faq-answer">{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="pricing-bottom-cta">
        <div className="cta-inner">
          <p className="cta-label">Event ticketing just got easier</p>
          <h2 className="cta-title">Create your event in 2 minutes</h2>
          <div className="cta-btns">
            <button className="btn-pricing-primary">Get Started</button>
            <a href="#" className="btn-pricing-demo">Book a Demo</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
