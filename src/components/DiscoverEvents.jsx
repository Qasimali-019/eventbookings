import { useNavigate } from 'react-router-dom';
import './DiscoverEvents.css';

const events = [
  {
    title: "Junior Park CC Presentation Night 2024",
    price: "$5.00",
    date: "Fri 2 November 2024 10:30 am",
    img: "/1.png"
  },
  {
    title: "Dedicated Day Out On the Green!!",
    price: "$45.45",
    date: "Fri 2 December 2024 9:00 am",
    img: "/1.png"
  },
  {
    title: "UNAPOLOGETICALLY ME",
    price: "$100.00",
    date: "Sat 23 March 2026 12:00 am",
    img: "/1.png"
  },
  {
    title: "Marathi Play - Sat 23 March",
    price: "$20.00",
    date: "Sat 23 March 2024 3:00 pm",
    img: "/1.png"
  },
  {
    title: "2024 Australasian FYSS & Peer Learning",
    price: "$110.00",
    date: "Mon 24 June 2024 4:30 pm",
    img: "/1.png"
  }
];
const DiscoverEvents = () => {
  const navigate = useNavigate();

  return (
    <section className="discover-events-section">
      <div className="discover-events-container">
        <div className="discover-header">
          <h2 className="discover-title">Discover events</h2>
          <a href="/explore" className="browse-all">Browse all &rarr;</a>
        </div>

        <div className="events-slider">
          <div className="events-grid">
            {events.map((event, i) => (
              <div key={i} className="event-card" onClick={() => navigate(`/event/${i + 1}`)}>
                <div className="event-img-wrapper">
                  <img src={event.img} alt={event.title} className="event-img" />
                </div>
                <div className="event-card-content">
                  <h4 className="event-card-title">{event.title}</h4>
                  <p className="event-card-price">{event.price}</p>
                  <p className="event-card-date">{event.date}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="slider-controls">
            <button className="slider-btn">&larr;</button>
            <button className="slider-btn">&rarr;</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscoverEvents;
