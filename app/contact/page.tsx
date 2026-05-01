import Link from "next/link";

export default function ContactPage() {
  return (
    <main>
      <section className="hero-section">
        <div className="hero-content">
          <h1>Have questions?</h1>
          <h2>We&apos;d love to hear from you!</h2>
        </div>
      </section>
      <section className="contact-section">
        <div className="contact-container">
          <p style={{ textAlign: "center", fontSize: "1.2rem" }}>
            Email{" "}
            <a href="mailto:sam@yorkvilletutor.com">sam@yorkvilletutor.com</a>
          </p>
          <p style={{ textAlign: "center", marginTop: 24 }}>
            <Link href="/courses" className="btn btn-primary">
              View courses
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
