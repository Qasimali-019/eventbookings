import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEvents } from '../context/EventContext';
import './ExploreEvents.css';



const categories = [
  "All", "Arts", "Business", "Music and Theater", "Community and Culture",
  "Sports and Fitness", "Education and Training"
];

const moreCategories = [
  "Entrepreneurship", "Family and Friends", "Film and Entertainment",
  "Coaching and Consulting", "Fashion and Beauty", "Food and Drink",
  "Health and Wellbeing", "Religion and Spirituality", "Free",
  "Government and Politics", "Hobbies and Interest", "Science and Technology",
  "Travel and Outdoor", "Visual Arts", "Others"
];

const ExploreEvents = () => {
  const { events } = useEvents();

  const [activeCategory, setActiveCategory] = useState("All");
  const [showMore, setShowMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEvents = events.filter(event => {
    const matchesCategory = activeCategory === "All" || event.category === activeCategory;
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (event.location && event.location.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="explore-page">
      {/* Hero Banner */}
      <section className="explore-hero">
        <div className="explore-hero-content">
          <h1 className="explore-hero-title">
            Discover Events For All<br />The Things You Love
          </h1>
          <div className="explore-search-bar">
            <div className="search-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search events by name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button className="search-btn">Search</button>
          </div>
        </div>
      </section>

      {/* Filters & Events */}
      <section className="explore-main">
        <div className="explore-container">
          {/* Category Filters */}
          <div className="filter-row category-filters">
            {categories.map((c) => (
              <button
                key={c}
                className={`category-pill ${activeCategory === c ? 'active' : ''}`}
                onClick={() => setActiveCategory(c)}
              >
                {c}
              </button>
            ))}
            <button
              className="category-pill more-btn"
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? 'Less' : 'More'} ▾
            </button>
          </div>

          {/* Extended Categories */}
          {showMore && (
            <div className="filter-row category-filters extended">
              {moreCategories.map((c) => (
                <button
                  key={c}
                  className={`category-pill ${activeCategory === c ? 'active' : ''}`}
                  onClick={() => setActiveCategory(c)}
                >
                  {c}
                </button>
              ))}
            </div>
          )}

          {/* Results Count */}
          <div className="results-header">
            <p className="results-count">
              Showing <strong>{filteredEvents.length}</strong> events
              {activeCategory !== "All" && <> in <strong>{activeCategory}</strong></>}
            </p>
          </div>

          {/* Event Cards Grid */}
          <div className="events-card-grid">
            {filteredEvents.map((event, i) => (
              <Link to={`/event/${event.id}`} className="explore-event-card" key={i}>
                <div className="explore-card-img-wrap">
                  <img src={event.img} alt={event.title} className="explore-card-img" />
                  <span className="explore-card-price">{event.price}</span>
                </div>
                <div className="explore-card-body">
                  <p className="explore-card-date">{event.date}</p>
                  <h3 className="explore-card-title">{event.title}</h3>
                  <p className="explore-card-location">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    {event.location}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {filteredEvents.length === 0 && (
            <div className="no-results">
              <h3>No events found</h3>
              <p>Try adjusting your filters or search query.</p>
            </div>
          )}

          {/* Load More */}
          <div className="load-more-wrap">
            <button className="load-more-btn">Load more events</button>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="explore-cta">
        <div className="explore-cta-inner">
          <h2>Want to host your own event?</h2>
          <p>Create and sell tickets for your event in minutes.</p>
          <button className="explore-cta-btn">Create Event</button>
        </div>
      </section>
    </div>
  );
};

export default ExploreEvents;
