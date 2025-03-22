import React from "react";
import Link from "next/link";
import { FaGithub, FaTwitter, FaDiscord } from "react-icons/fa";
import Image from "next/image";
import Icon from "../../public/icon.png";
interface FooterProps {
  appName?: string;
}

const Footer: React.FC<FooterProps> = ({ appName = "Memory Ball" }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer p-10 bg-neutral text-neutral-content mt-auto font-bricolage">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* App Info */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-2">
            <Image src={Icon} alt="memory ball logo" width={40} height={40} />
            <span className="text-xl font-bold">{appName}</span>
          </div>
          <p className="text-sm opacity-75">
            Create, study, and master your flashcards with ease.
          </p>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-1">
          <h2 className="footer-title">Quick Links</h2>
          <nav className="flex flex-col gap-2">
            <Link href="/" className="link link-hover">
              Home
            </Link>
            <Link href="/create" className="link link-hover">
              Create Cards
            </Link>
            <Link href="/decks" className="link link-hover">
              My Decks
            </Link>
            <Link href="/study" className="link link-hover">
              Study Mode
            </Link>
          </nav>
        </div>

        {/* Resources */}
        <div className="md:col-span-1">
          <h2 className="footer-title">Resources</h2>
          <nav className="flex flex-col gap-2">
            <Link href="/help" className="link link-hover">
              Help Center
            </Link>
            <Link href="/blog" className="link link-hover">
              Study Tips
            </Link>
            <Link href="/privacy" className="link link-hover">
              Privacy Policy
            </Link>
            <Link href="/terms" className="link link-hover">
              Terms of Use
            </Link>
          </nav>
        </div>

        {/* Connect */}
        <div className="md:col-span-1">
          <h2 className="footer-title">Connect</h2>
          <div className="flex gap-4 mt-2">
            <a
              href="https://github.com/yourusername/flashcards"
              aria-label="GitHub"
              className="btn btn-circle btn-ghost"
            >
              <FaGithub className="text-xl" />
            </a>
            <a
              href="https://twitter.com/yourhandle"
              aria-label="Twitter"
              className="btn btn-circle btn-ghost"
            >
              <FaTwitter className="text-xl" />
            </a>
            <a
              href="https://discord.gg/yourserver"
              aria-label="Discord"
              className="btn btn-circle btn-ghost"
            >
              <FaDiscord className="text-xl" />
            </a>
          </div>
          <div className="mt-4">
            <a
              href="mailto:contact@flashmaster.app"
              className="link link-hover text-sm"
            >
              contact@memoryball.co
            </a>
          </div>
        </div>
      </div>
      <div className="divider my-4"></div>
      <div className="container mx-auto text-center text-sm opacity-75">
        <p>
          © {currentYear} {appName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
