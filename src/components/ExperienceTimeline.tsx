const experiences = [
  {
    date: 'April 2024 - Present',
    title: 'Founder & Lead Developer',
    company: 'Miles Automation',
    description:
      'Building a fleet of products on a self-hosted platform\u2014project dashboards, digital vaults, context engines for LLMs, and the infrastructure that keeps them all running.',
  },
  {
    date: 'Aug 2023 - April 2024',
    title: 'Game Developer',
    company: 'Edventure Studios',
    description:
      'Built Edventure Trek, an educational game using Unity/C#/SQLite on the frontend and Python/FastAPI/MySQL on the backend. Launched a successful Kickstarter campaign that validated core concepts.',
  },
  {
    date: 'Nov 2015 - Aug 2023',
    title: 'CTO & Backend Developer',
    company: 'Neowire',
    description:
      'Built a full Azure CI/CD pipeline with blue/green deployments. Scaled operations to 250,000+ users in European markets while managing diverse data regulations.',
  },
  {
    date: 'Dec 2011 - Mar 2016',
    title: 'Lead Software Developer',
    company: 'Propel Labs',
    description:
      'Engineered a next-generation flow cytometry platform in C#/WPF, capable of real-time analysis of up to 100,000 events/sec. Pioneered automated drop delay calibration, replacing manual steps with a patented system.',
  },
]

export default function ExperienceTimeline() {
  return (
    <section className="experience" id="experience">
      <div className="container">
        <h2 className="section-title">Experience</h2>
        <div className="timeline">
          {experiences.map((exp, i) => (
            <div className="timeline-item" key={i}>
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <span className="timeline-date">{exp.date}</span>
                <h3 className="timeline-title">{exp.title}</h3>
                <h4 className="timeline-company">{exp.company}</h4>
                <p>{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
