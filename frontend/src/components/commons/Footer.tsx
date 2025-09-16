"use client"
import { useTheme } from "../../context/ThemeContext"

export default function Footer() {
  const { theme, setTheme } = useTheme()

  return (
    <footer className="footer">
      <div className="copy-section" title="Copyright">
        <span>©</span>
        <span>Real Estate API</span>
      </div>

      <div className="theme-buttons">
        <button
          className={`theme-button ${theme === "system" ? "active" : ""}`}
          onClick={() => setTheme("system")}
          title="System"
        >
          🖥️
        </button>
        <button
          className={`theme-button ${theme === "light" ? "active" : ""}`}
          onClick={() => setTheme("light")}
          title="Light"
        >
          ☀️
        </button>
        <button
          className={`theme-button ${theme === "dark" ? "active" : ""}`}
          onClick={() => setTheme("dark")}
          title="Dark"
        >
          🌙
        </button>
      </div>
    </footer>
  )
}