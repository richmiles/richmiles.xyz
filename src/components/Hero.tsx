type HeroProps = {
  onCta: () => void
}

export default function Hero({ onCta }: HeroProps) {
  return (
    <section className="hero" id="about">
      <div className="container hero-content">
        <img src="/img/profile.png" alt="Rich Miles" className="hero-photo" />
        <h1>Rich Miles</h1>
        <p className="hero-tagline">I build tools that stay running.</p>
        <p className="hero-description">
          Twenty years of shipping software&mdash;from flow cytometry to fintech to digital vaults.
          Currently building a fleet of products from Laramie, Wyoming.
        </p>
        <button
          className="btn"
          onClick={(e) => {
            e.preventDefault()
            onCta()
          }}
        >
          View my work &darr;
        </button>
      </div>
    </section>
  )
}
