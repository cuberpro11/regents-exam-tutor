export default function PrivacyPolicyPage() {
  return (
    <main>
      <section className="hero-section">
        <div className="hero-content" style={{ textAlign: "left", maxWidth: 900, margin: "0 auto" }}>
          <h1>Privacy Policy</h1>
          <p>
            We collect account and purchase information necessary to deliver your
            courses and process payments. Payment card data is handled by Stripe.
            We do not sell your personal information.
          </p>
          <p>
            For privacy requests contact{" "}
            <a href="mailto:sam@yorkvilletutor.com">sam@yorkvilletutor.com</a>.
          </p>
        </div>
      </section>
    </main>
  );
}
