import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__content">
        <Link href="/" className="navbar__logo">
          Real Estate API
        </Link>
      </div>
    </nav>
  )
}