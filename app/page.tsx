import Link from "next/link";
import { FadeOnScroll } from "@/components/FadeOnScroll";
import { HeroCommercialVideo } from "@/components/HeroCommercialVideo";
import { HlsVideo } from "@/components/HlsVideo";
import { SITE_VIDEOS } from "@/lib/site-videos";

export default function HomePage() {
  return (
    <>
      <section className="hero-video-section">
        <div className="hero-video-container">
          <HeroCommercialVideo />
        </div>
        <div className="hero-video-overlay">
          <Link href="/courses" className="hero-video-overlay-button">
            GET STARTED
          </Link>
        </div>
      </section>
      <div className="container">
        <FadeOnScroll>
          <main>
            <section
              className="fade-in"
              style={{ textAlign: "center", padding: "60px 0" }}
            >
              <h2 className="section-title">Watch the Trailer:</h2>
              <div className="video-container">
                <HlsVideo src={SITE_VIDEOS.homeTrailer} controls />
              </div>
            </section>
            <section
              className="fade-in"
              style={{ textAlign: "center", padding: "60px 0" }}
            >
              <h2 className="section-title">COURSE OVERVIEW</h2>
              <p>
                Earn a strong score on the Geometry Regents Exam with engaging,
                step-by-step video answers and explanations to all of the
                questions on the latest administered exams. This self-paced
                course is far better than studying from black & white books
                that haven&apos;t changed in a generation. For the past 20
                years, I&apos;ve been sharing my test prep teaching style and
                strategies with students during live sessions through my tutoring
                practice—lessons that are now available in this self-paced
                course
              </p>
            </section>
            <section className="grid-container fade-in">
              <div className="grid-item">
                <div className="feature-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10 9 9 9 8 9" />
                  </svg>
                </div>
                <h3>PRACTICE TESTS</h3>
                <p>
                  2 full recent exams + step-by-step video answer explanations
                  for every question
                </p>
              </div>
              <div className="grid-item">
                <div className="feature-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden
                  >
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  </svg>
                </div>
                <h3>MATERIAL</h3>
                <p>Questions organized by topic for unit-specific studying</p>
              </div>
              <div className="grid-item">
                <div className="feature-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden
                  >
                    <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 1 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3>STRATEGIES</h3>
                <p>
                  Test-taking techniques from Columbia University alum &
                  full-time tutor for 16 years
                </p>
              </div>
              <div className="grid-item">
                <div className="feature-icon">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden
                  >
                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                  </svg>
                </div>
                <h3>SKILL LEVEL</h3>
                <p>All levels.</p>
              </div>
            </section>
            <section className="flex-container fade-in">
              <div className="flex-item-text text-center">
                <h2>
                  Self-paced course on everything you need to know to earn a
                  strong score on the Regents
                </h2>
                <Link href="/courses" className="btn btn-primary">
                  BUY COURSE
                </Link>
              </div>
              <div className="flex-item-image">
                <img
                  src="/static/Self-paced course on everything you need to know to earn a strong score on the Regents.jpeg"
                  alt="Self-paced Regents course"
                  className="resizable-image"
                />
              </div>
            </section>
            <section className="flex-container text-above-image fade-in">
              <div className="flex-item-text">
                <h2>Dynamic step-by-step answers explained videos</h2>
              </div>
              <div className="flex-item-image">
                <img
                  src="/static/Dynamic step-by-step answers explained videos.jpg"
                  alt="Video explanations"
                  className="resizable-image"
                />
              </div>
            </section>
            <section className="flex-container fade-in">
              <div className="flex-item-text text-center">
                <h2>Organized by test &amp; by unit</h2>
                <Link href="/courses" className="btn btn-primary">
                  GET THE COURSE
                </Link>
              </div>
              <div className="flex-item-image">
                <img
                  src="/static/Organized by test & by unit.jpeg"
                  alt="Organized by test and unit"
                  className="resizable-image"
                />
              </div>
            </section>
            <section className="testimonials-section fade-in">
              <h2 className="testimonials-title">WHAT STUDENTS ARE SAYING</h2>
              <div className="testimonials-container">
                <div className="testimonial-video-container">
                  <HlsVideo src={SITE_VIDEOS.troyTestimonial} controls />
                </div>
                <div className="testimonial-video-container">
                  <HlsVideo src={SITE_VIDEOS.peterTestimonial} controls />
                </div>
                <div className="testimonial-card">
                  <div className="testimonial-profile">
                    <img
                      src="/static/Dylan testimonal.jpg"
                      alt="Dylan M."
                      className="testimonial-avatar"
                    />
                  </div>
                  <p className="testimonial-quote">
                    &quot;After learning from Sam, I got a 96 on my Regents.&quot;
                  </p>
                  <div>
                    <div className="testimonial-name">Dylan M.</div>
                    <div className="testimonial-subtitle">
                      Millennium Student
                    </div>
                  </div>
                </div>
                <div className="testimonial-card">
                  <div className="testimonial-profile">
                    <img
                      src="/static/Olivia testimonal.jpg"
                      alt="Olivia Y."
                      className="testimonial-avatar"
                    />
                  </div>
                  <p className="testimonial-quote">
                    &quot;The way [Sam] tutors makes you learn faster&quot;
                  </p>
                  <div>
                    <div className="testimonial-name">Olivia Y.</div>
                    <div className="testimonial-subtitle">Lab Student</div>
                  </div>
                </div>
              </div>
            </section>
            <section className="grid-images-container">
              <img
                src="/static/landing page grid 1.jpg"
                alt=""
                className="resizable-image fade-in fade-in-delay-1"
              />
              <img
                src="/static/landing page grid 2.jpg"
                alt=""
                className="resizable-image fade-in fade-in-delay-2"
              />
              <img
                src="/static/landing page grid 3.jpg"
                alt=""
                className="resizable-image fade-in fade-in-delay-3"
              />
              <img
                src="/static/landing page grid 4.jpg"
                alt=""
                className="resizable-image fade-in fade-in-delay-4"
              />
            </section>
            <section
              className="fade-in"
              style={{ textAlign: "center", padding: "60px 0" }}
            >
              <Link href="/courses" className="btn btn-primary">
                Start Now
              </Link>
            </section>
          </main>
        </FadeOnScroll>
      </div>
    </>
  );
}
