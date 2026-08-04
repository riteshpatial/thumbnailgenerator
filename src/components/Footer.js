import React from "react";
import { MailIcon, LinkedInIcon, GitHubIcon, WhatsAppIcon } from "./icons";

const CONTACT_LINKS = [
  { label: "Gmail", href: "mailto:riteshpatial430@gmail.com", Icon: MailIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/ritesh-patial-b183bb349", Icon: LinkedInIcon },
  { label: "GitHub", href: "https://github.com/riteshpatial", Icon: GitHubIcon },
  { label: "WhatsApp", href: "https://wa.me/916230075812", Icon: WhatsAppIcon },
];

export default function Footer() {
  return (
    <footer className="site-footer panel-in">
      <div className="site-footer__sprocket" aria-hidden="true" />
      <div className="site-footer__body">
        <h2>About</h2>
        <p>
          With a vision to transform video editing, I crafted this website as a dedicated BCA student. My mission
          is to provide streamlined, professional-grade tools that empower users to create compelling content with
          ease and efficiency.
        </p>

        <h4>Get in touch</h4>
        <div className="contact-links">
          {CONTACT_LINKS.map(({ label, href, Icon }) => (
            <a
              key={label}
              className="contact-link"
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer noopener" : undefined}
            >
              <span className="contact-link__badge">
                <Icon />
              </span>
              <span className="contact-link__label">{label}</span>
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
