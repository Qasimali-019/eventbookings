import React from 'react';
import { useParams } from 'react-router-dom';
import './IndustryDetail.css';

const industryContent = {
  concert: {
    title: "Sell Concert Tickets With Our Dynamic Event Ticketing Platform",
    desc: "Transform your ticket sales with our dynamic event platform. Sell concert tickets seamlessly, maximise profits, and elevate your business. Get started now!",
    heroImg: "/hero_illustration.png",
    features: [
      {
        title: "Lowest ticketing fees on the market",
        desc: "EventBookings offers the most competitive rates for concert organizers, helping you keep more of your revenue.",
        img: "/faetures1.png"
      },
      {
        title: "Marketing Tools to Boost Sales",
        desc: "Reach a wider audience with our built-in marketing and promotion tools designed specifically for concerts.",
        img: "/faetures2.png"
      }
    ],
    faqs: [
      { q: "How to get sponsors for my concert event?", a: "Building a solid event proposal and reaching out to brands that align with your audience is key." },
      { q: "What kind of customer support can I expect?", a: "We offer 24/7 dedicated support for all our enterprise-level concert organizers." }
    ]
  },
  business: {
    title: "The powerful ticketing platform for business events",
    desc: "Effortlessly manage business event ticketing with EventBookings. Simplify registrations and elevate your events. Get started now!",
    heroImg: "/hero_illustration.png",
    features: [
      {
        title: "Seamless Registration Process",
        desc: "Our platform ensures a smooth registration flow for your attendees, from invitations to ticket delivery.",
        img: "/faetures1.png"
      },
      {
        title: "Smart Conditional Forms",
        desc: "Gather exactly the data you need with our customizable smart forms for corporate registrations.",
        img: "/faetures2.png"
      }
    ],
    faqs: [
      { q: "Can I manage team collaboration?", a: "Yes, our platform allows you to invite multiple team members with specific roles." },
      { q: "Is the payment process secure?", a: "Absolutely. We use industry-standard encryption for all transactions." }
    ]
  },
  sports: {
    title: "The ultimate ticketing solution for sports events",
    desc: "From local tournaments to national championships, EventBookings makes sports ticketing easy for both organisers and fans.",
    heroImg: "/hero_illustration.png",
    features: [
      {
        title: "Ticket Scanning Made Simple",
        desc: "Use our mobile app to scan tickets at the door quickly, ensuring no long queues for the fans.",
        img: "/faetures1.png"
      },
      {
        title: "Interactive Seating Maps",
        desc: "Allow fans to pick their favorite seats with our high-end interactive seating chart functionality.",
        img: "/faetures2.png"
      }
    ],
    faqs: [
      { q: "Can I sell merchandise at the gate?", a: "Yes, our on-the-spot selling features allow you to sell both tickets and merchandise." }
    ]
  },
  charity: {
    title: "Raise more funds for your charity mission",
    desc: "Empower your fundraising efforts with a ticketing platform that cares. Lower fees mean more money for your cause.",
    heroImg: "/hero_illustration.png",
    features: [
      {
        title: "Zero Fees for Free Events",
        desc: "Run your free community or charity events without any ticketing cost, guaranteed.",
        img: "/faetures1.png"
      },
      {
        title: "Easy Donation Collection",
        desc: "Integrate a donation option directly into your ticket checkout flow to boost your fundraising.",
        img: "/faetures2.png"
      }
    ],
    faqs: [
      { q: "How do I set up a donation-only ticket?", a: "You can create a custom ticket type specifically for donations in the event dashboard." }
    ]
  },
  councils: {
    title: "Streamlined ticketing for local councils and government",
    desc: "Manage community events, town halls, and local festivals with a secure and reliable ticketing platform.",
    heroImg: "/hero_illustration.png",
    features: [
      {
        title: "Compliance & Security",
        desc: "We meet the highest standards of data protection and compliance required for government entities.",
        img: "/faetures1.png"
      },
      {
        title: "Gather Community Feedback",
        desc: "Use event forms to collect valuable data and feedback from your local community members.",
        img: "/faetures2.png"
      }
    ],
    faqs: [
      { q: "Can we use our own branding?", a: "Yes, our white-label options allow you to maintain your council's brand identity." }
    ]
  },
  community: {
    title: "Bring people together with ease",
    desc: "Whether it's a neighborhood BBQ or a cultural festival, EventBookings is the perfect partner for your community.",
    heroImg: "/hero_illustration.png",
    features: [
      {
        title: "Simple & Fast Ticketing",
        desc: "Don't stress over tech. Our simple setup gets your community event live in just minutes.",
        img: "/faetures1.png"
      },
      {
        title: "Promote Your Local Event",
        desc: "Share your event easily on social media with our integrated sharing tools.",
        img: "/faetures2.png"
      }
    ],
    faqs: [
      { q: "Is it free for free events?", a: "Yes, we don't charge any platform fees for free events." }
    ]
  },
  entertainment: {
    title: "The go-to platform for entertainment events",
    desc: "Theatres, comedy clubs, and festivals trust EventBookings to handle their ticket sales and guest management.",
    heroImg: "/hero_illustration.png",
    features: [
      {
        title: "Flexible Ticket Types",
        desc: "Offer VIP, Early Bird, and Group tickets to maximize your venue's capacity.",
        img: "/faetures1.png"
      },
      {
        title: "On-the-go Sales",
        desc: "Sell tickets anywhere with our mobile-friendly ticketing solution for physical box offices.",
        img: "/faetures2.png"
      }
    ],
    faqs: [
      { q: "Can I manage multiple showtimes?", a: "Our recurring event feature makes managing multiple dates and times a breeze." }
    ]
  }
};

const IndustryDetail = () => {
  const { industryId } = useParams();
  const content = industryContent[industryId?.toLowerCase()] || industryContent.concert;

  return (
    <div className="industry-detail">
      {/* ── HERO ── */}
      <section className="ind-hero">
        <div className="ind-hero__inner">
          <div className="ind-hero__text">
            <h1>{content.title}</h1>
            <p>{content.desc}</p>
            <div className="ind-hero__ctas">
              <button className="ind-btn ind-btn--primary">Create Event</button>
              <button className="ind-btn ind-btn--outline">Contact Us</button>
            </div>
          </div>
          <div className="ind-hero__image">
            <img src={content.heroImg} alt={industryId} />
          </div>
        </div>
      </section>

      {/* ── COMPARISON ── */}
      <section className="ind-comparison">
        <div className="ind-comparison__inner">
          <h2>Lowest ticketing fees on the market</h2>
          <div className="ind-comparison__grid">
            <div className="ind-comp-card ind-comp-card--eb">
              <h3>EventBookings</h3>
              <p className="ind-comp-price">$0</p>
              <p className="ind-comp-label">Fees for organizers</p>
            </div>
            <div className="ind-comp-card">
              <h3>Others</h3>
              <p className="ind-comp-price">$2.00+</p>
              <p className="ind-comp-label">Average per ticket</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ZIGZAG FEATURES ── */}
      <section className="ind-features">
        <div className="ind-features__inner">
          {content.features.map((feature, index) => (
            <div key={index} className={`ind-feature-row ${index % 2 !== 0 ? 'ind-feature-row--reverse' : ''}`}>
              <div className="ind-feature-text">
                <h2>{feature.title}</h2>
                <p>{feature.desc}</p>
              </div>
              <div className="ind-feature-image">
                <img src={feature.img} alt={feature.title} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="ind-faq">
        <div className="ind-faq__inner">
          <h2>Frequently asked questions</h2>
          <div className="ind-faq-list">
            {content.faqs.map((faq, index) => (
              <details key={index} className="ind-faq-item">
                <summary className="ind-faq-question">{faq.q} <span className="ind-faq-icon">+</span></summary>
                <div className="ind-faq-answer">
                  <p>{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="ind-bottom-cta">
        <div className="ind-bottom-cta__inner">
          <h2>Ready to elevate your {industryId} events?</h2>
          <button className="ind-btn ind-btn--primary ind-btn--large">Get Started Now</button>
        </div>
      </section>
    </div>
  );
};

export default IndustryDetail;
