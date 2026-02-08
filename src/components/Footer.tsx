export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer>
      <div className="container">
        <p className="copyright">&copy; {year} Rich Miles</p>
      </div>
    </footer>
  )
}
