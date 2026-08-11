import SiteHeader from "@/components/SiteHeader";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <div className="container">
        <h1>What is Web Development?</h1>
        <p style={{ color: "#94a3b8" }}>
          A high-level look at what it means to build for the web.
        </p>

        <div className="card">
          <h2>The short version</h2>
          <p>
            Web development is the work of building and maintaining websites
            and web applications — everything from a simple personal blog to
            a large app like an online store or a social network. It covers
            the code that makes pages look right, the code that makes them
            interactive, and the systems behind the scenes that store data
            and handle logic.
          </p>
        </div>

        <div className="card">
          <h2>Two broad halves</h2>
          <p>
            Most web projects split into a <strong>frontend</strong> (what
            people see and click on in their browser) and a{" "}
            <strong>backend</strong> (servers, databases, and logic running
            out of sight). This site is a small example of both: the login
            page and the pages you're reading are the frontend, and Supabase
            handling your login link is the backend.
          </p>
        </div>

        <div className="card">
          <h2>Why it matters</h2>
          <p>
            Nearly everything you use online — email, banking, streaming,
            shopping — is a web application under the hood. Learning web
            development means learning how those experiences actually get
            built.
          </p>
          <p>
            Want more detail on the tools and languages involved?{" "}
            <a href="/about">Check out the About page →</a>
          </p>
        </div>
      </div>
    </>
  );
}
