import Link from "next/link";

export default function BlogsPage() {
  return (
    <main
      style={{
        minHeight: "calc(100vh - 200px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="container" style={{ textAlign: "center", paddingTop: 50, flex: 1 }}>
        <h1>Blogs are coming soon!</h1>
        <p>We are working hard to bring you insightful content.</p>
        <Link href="/" className="btn btn-primary">
          Go Home
        </Link>
      </div>
    </main>
  );
}
