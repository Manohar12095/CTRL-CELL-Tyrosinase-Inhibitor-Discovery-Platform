"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  {
    label: "Round 1",
    href: "/round1",
    sub: [
      { label: "Overview", href: "/round1" },
      { label: "Target", href: "/round1/target" },
      { label: "Candidates", href: "/round1/candidates" },
      { label: "Docking", href: "/round1/docking" },
      { label: "Safety", href: "/round1/safety" },
      { label: "Dossier", href: "/round1/dossier" },
    ],
  },
  {
    label: "Round 2",
    href: "/round2",
    sub: [
      { label: "Overview", href: "/round2" },
      { label: "Safety Review", href: "/round2/safety-review" },
      { label: "Novelty Review", href: "/round2/novelty-review" },
      { label: "Decision", href: "/round2/decision" },
      { label: "Addendum", href: "/round2/addendum" },
    ],
  },
  { label: "Methods", href: "/methods" },
  { label: "About", href: "/about" },
];

export function TopNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  const isActive = (href: string) =>
    href === "/round1" || href === "/round2"
      ? pathname.startsWith(href)
      : pathname === href;

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: "rgba(8, 11, 18, 0.85)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid #21262d",
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 64,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
          {/* Logo */}
          <Link
            href="/"
            style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.5rem" }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 14,
                fontWeight: 800,
                color: "#fff",
                fontFamily: "var(--font-mono)",
              }}
            >
              C+
            </div>
            <span
              style={{
                fontWeight: 700,
                fontSize: "1rem",
                background: "linear-gradient(135deg, #7c3aed, #06b6d4)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              CTRL+CELL
            </span>
          </Link>

          {/* Nav items (desktop only) */}
          <div className="hidden md:flex" style={{ alignItems: "center", gap: "0.25rem" }}>
            {navItems.map((item) => (
              <div
                key={item.href}
                style={{ position: "relative" }}
                onMouseEnter={() => item.sub && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={item.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.25rem",
                    padding: "0.5rem 0.75rem",
                    borderRadius: 8,
                    fontSize: "0.875rem",
                    fontWeight: 500,
                    textDecoration: "none",
                    color: isActive(item.href) ? "#e2e8f0" : "#94a3b8",
                    background: isActive(item.href) ? "rgba(124,58,237,0.12)" : "transparent",
                    transition: "all 0.15s ease",
                  }}
                >
                  {item.label}
                  {item.sub && (
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                      <path d="M6 8L2 4h8L6 8z" />
                    </svg>
                  )}
                </Link>

                {/* Desktop Dropdown */}
                {item.sub && activeDropdown === item.label && (
                  <div
                    style={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      marginTop: 4,
                      background: "#0d1117",
                      border: "1px solid #21262d",
                      borderRadius: 10,
                      padding: "0.5rem",
                      minWidth: 180,
                      boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                    }}
                  >
                    {item.sub.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={() => setActiveDropdown(null)}
                        style={{
                          display: "block",
                          padding: "0.4rem 0.75rem",
                          borderRadius: 6,
                          fontSize: "0.8125rem",
                          textDecoration: "none",
                          color: pathname === sub.href ? "#c4b5fd" : "#94a3b8",
                          background:
                            pathname === sub.href ? "rgba(124,58,237,0.1)" : "transparent",
                          transition: "all 0.12s ease",
                        }}
                        onMouseEnter={(e) => {
                          (e.target as HTMLElement).style.background = "rgba(124,58,237,0.08)";
                          (e.target as HTMLElement).style.color = "#e2e8f0";
                        }}
                        onMouseLeave={(e) => {
                          (e.target as HTMLElement).style.background =
                            pathname === sub.href ? "rgba(124,58,237,0.1)" : "transparent";
                          (e.target as HTMLElement).style.color =
                            pathname === sub.href ? "#c4b5fd" : "#94a3b8";
                        }}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {/* Round badge */}
          <div className="hidden sm:flex" style={{ alignItems: "center", gap: "0.5rem" }}>
            <span
              style={{
                padding: "0.2rem 0.6rem",
                borderRadius: 999,
                fontSize: "0.7rem",
                fontWeight: 700,
                background: pathname.startsWith("/round2")
                  ? "rgba(245,158,11,0.15)"
                  : "rgba(124,58,237,0.15)",
                color: pathname.startsWith("/round2") ? "#fbbf24" : "#a78bfa",
                border: `1px solid ${pathname.startsWith("/round2") ? "rgba(245,158,11,0.3)" : "rgba(124,58,237,0.3)"}`,
                letterSpacing: "0.05em",
                textTransform: "uppercase" as const,
              }}
            >
              {pathname.startsWith("/round2") ? "Round 2" : "Round 1"}
            </span>
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden" 
            onClick={() => setOpen(!open)}
            style={{
              background: "transparent",
              border: "none",
              color: "#e2e8f0",
              padding: "0.5rem",
              cursor: "pointer",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {open ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden" style={{ background: "#080b12", borderBottom: "1px solid #21262d" }}>
          <div style={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {navItems.map((item) => (
              <div key={item.href}>
                <div 
                  style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                  onClick={() => item.sub && setMobileExpanded(mobileExpanded === item.label ? null : item.label)}
                >
                  <Link
                    href={item.href}
                    onClick={() => { if (!item.sub) setOpen(false); }}
                    style={{
                      display: "block",
                      padding: "0.75rem",
                      fontSize: "1rem",
                      fontWeight: 500,
                      color: isActive(item.href) ? "#e2e8f0" : "#94a3b8",
                      textDecoration: "none",
                      width: "100%",
                    }}
                  >
                    {item.label}
                  </Link>
                  {item.sub && (
                    <span style={{ padding: "0.75rem", color: "#94a3b8" }}>
                      {mobileExpanded === item.label ? "▼" : "▶"}
                    </span>
                  )}
                </div>
                
                {/* Mobile Submenu */}
                {item.sub && mobileExpanded === item.label && (
                  <div style={{ paddingLeft: "1rem", display: "flex", flexDirection: "column", gap: "0.25rem", marginTop: "0.25rem", borderLeft: "2px solid #21262d" }}>
                    {item.sub.map((sub) => (
                      <Link
                        key={sub.href}
                        href={sub.href}
                        onClick={() => setOpen(false)}
                        style={{
                          display: "block",
                          padding: "0.5rem 0.75rem",
                          fontSize: "0.875rem",
                          color: pathname === sub.href ? "#c4b5fd" : "#64748b",
                          textDecoration: "none",
                        }}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
