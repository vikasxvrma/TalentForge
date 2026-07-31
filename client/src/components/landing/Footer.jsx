import React from 'react'

const Footer = () => {
    const year = new Date().getFullYear();
  return (
          <footer className="border-t border-border bg-background">
  <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-10 text-sm text-muted md:flex-row">
    
    <div className="flex items-center gap-3">
      <img
        src="/star.png"
        alt="TalentForge"
        className="h-8 w-8 rounded-lg"
      />

      <div>
        <p className="font-medium text-foreground">
          TalentForge
        </p>

        <p>AI Career Intelligence Platform</p>
      </div>
    </div>

    <div className="flex items-center gap-6">
      <a
        href="https://github.com/vikasxvrma"
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub Profile"
        className="transition-colors hover:text-primary duration-200"
      >
        GitHub
      </a>

      <a
        href="https://linkedin.com/in/vikasxvrma"
        target="_blank"
        rel="noreferrer"
        aria-label="LinkedIn Profile"
        className="transition-colors hover:text-primary  duration-200"
      >
        LinkedIn
      </a>
    </div>

<p className="text-center">
  © {year} TalentForge • Crafted by{" "}
  <span className="font-medium text-foreground">
    Vikas Verma
  </span>
</p>

  </div>
</footer>
  )
}

export default Footer