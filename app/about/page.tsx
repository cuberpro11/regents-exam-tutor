import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <section className="page-hero-section about-hero">
        <div className="page-hero-overlay" />
        <div className="page-hero-content">
          <h1>About Us</h1>
        </div>
      </section>
      <main>
        <section className="hero-section">
          <div className="hero-content">
            <div className="flex-container">
              <div className="flex-item-text">
                <h1>Regents Exam Tutor</h1>
                <p>
                  Regents Exam Tutor courses are taught by Sam. His first paid job
                  was tutoring a fellow student at the NYC Lab School for the
                  geometry Regents. Tutoring through college helped support Sam as
                  an undergrad at Columbia University. He established a full-time
                  tutoring practice after graduating in &apos;07.
                </p>
              </div>
              <div className="flex-item-image">
                <img
                  src="/static/sam.jpg"
                  alt="Sam"
                  className="resizable-image"
                />
              </div>
            </div>
          </div>
        </section>
        <section className="why-regents-section">
          <div className="hero-content">
            <h2>Why Regents Exam Tutor?</h2>
            <p>
              Comprehensive Regents prep with step-by-step video answers to
              questions on recent exams—organized by released tests and by
              subject units.
            </p>
            <Link href="/courses" className="btn btn-primary">
              SAM&apos;S COURSES
            </Link>
          </div>
        </section>
        <section className="experience-section">
          <div className="experience-container">
            <div className="experience-column">
              <img
                src="/static/nyu.jpg"
                alt="NYU Medical Center"
                className="experience-image"
              />
              <h3>NYU Medical Center</h3>
              <p>
                Research experience in infectious disease as a high school
                student.
              </p>
            </div>
            <div className="experience-column">
              <img
                src="/static/columbia.webp"
                alt="Columbia University"
                className="experience-image"
              />
              <h3>Columbia University</h3>
              <p>Premed biology major while continuing to tutor.</p>
            </div>
            <div className="experience-column">
              <img
                src="/static/tutoring practice.jpg"
                alt="Tutoring"
                className="experience-image"
              />
              <h3>Full-time tutoring</h3>
              <p>Two decades of Regents and test prep experience.</p>
            </div>
          </div>
        </section>
        <section className="team-section">
          <h2>Meet Our Team</h2>
          <div className="team-container">
            <div className="team-member">
              <img src="/static/team sam.jpg" alt="Sam" />
              <h3>Sam</h3>
              <p>Primary Tutor</p>
            </div>
            <div className="team-member">
              <img src="/static/team jonas.jpg" alt="Jonas" />
              <h3>Jonas</h3>
              <p>Engineer</p>
            </div>
            <div className="team-member">
              <img src="/static/team josef.jpg" alt="Josef" />
              <h3>Joe</h3>
              <p>Content Tester</p>
            </div>
          </div>
          <Link href="/courses" className="btn btn-primary experience-button">
            GET STARTED NOW
          </Link>
        </section>
      </main>
    </>
  );
}
