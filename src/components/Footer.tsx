import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-dark-surface pt-20 pb-8 border-t border-border">
      <div className="max-w-[1400px] mx-auto px-12 max-md:px-5">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-16 mb-16 max-md:grid-cols-1 max-md:gap-10">
          <div>
            <div className="font-heading text-2xl font-bold mb-4">Launchpad.</div>
            <p className="text-text-dim leading-[1.7] max-w-[350px]">
              Enterprise AI automation platforms driving measurable business outcomes.
            </p>
          </div>
          <div>
            <div className="font-semibold mb-6 text-[1.05rem]">Products</div>
            <a
              href="https://launchpadboost.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-text-dim no-underline mb-4 text-[0.95rem] hover:text-text transition-colors"
            >
              Launchpad Boost
            </a>
            <a
              href="https://launchpadautomation.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-text-dim no-underline mb-4 text-[0.95rem] hover:text-text transition-colors"
            >
              Launchpad Automation
            </a>
          </div>
          <div>
            <div className="font-semibold mb-6 text-[1.05rem]">Company</div>
            <Link href="/about" className="block text-text-dim no-underline mb-4 text-[0.95rem] hover:text-text transition-colors">
              About
            </Link>
            <Link href="/contact" className="block text-text-dim no-underline mb-4 text-[0.95rem] hover:text-text transition-colors">
              Contact
            </Link>
          </div>
          <div>
            <div className="font-semibold mb-6 text-[1.05rem]">Legal</div>
            <Link href="/privacy" className="block text-text-dim no-underline mb-4 text-[0.95rem] hover:text-text transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="block text-text-dim no-underline mb-4 text-[0.95rem] hover:text-text transition-colors">
              Terms
            </Link>
          </div>
        </div>
        <div className="pt-12 border-t border-border text-center text-text-dim text-[0.9rem]">
          <p>&copy; 2026 Launchpad. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
