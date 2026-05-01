export default function Home() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "#0a0a0a",
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      fontFamily: "system-ui"
    }}>
      
      <h1 style={{ fontSize: "2rem", marginBottom: "20px" }}>
        Mediaproof
      </h1>

      <textarea
        placeholder="Paste a claim, URL, or headline..."
        style={{
          width: "300px",
          height: "100px",
          padding: "10px",
          background: "#111",
          border: "1px solid #333",
          color: "#fff"
        }}
      />

      <button style={{
        marginTop: "10px",
        padding: "10px 20px",
        background: "#fff",
        color: "#000",
        border: "none",
        cursor: "pointer"
      }}>
        Analyze
      </button>

    </main>
  );
}