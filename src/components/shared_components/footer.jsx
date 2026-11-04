import Link from "next/link";

const categories = [
  ["Photography Studios", "/studios?category=photography"],
  ["Podcast Studios", "/studios?category=podcast"],
  ["Film Stages", "/studios?category=film"],
  ["Music Studios", "/studios?category=music"],
];

export default function SiteFooter() {
  return (
    <footer className="bg-slate-50 text-slate-700 dark:bg-slate-950 dark:text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:grid-cols-2 lg:grid-cols-3 lg:px-8">
        <div>
          <Link className="text-xl font-bold text-slate-950 dark:text-white" href="/">StudioSpace</Link>
          <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-400">Find inspiring creative spaces for your next project, from studios and stages to podcast lounges and workshops.</p>
          <p className="mt-4 text-sm text-slate-500">Follow us: <a className="hover:text-cyan-600 dark:hover:text-cyan-400" href="https://x.com/" rel="noreferrer" target="_blank">X</a> · <a className="hover:text-cyan-600 dark:hover:text-cyan-400" href="https://www.instagram.com/" rel="noreferrer" target="_blank">Instagram</a></p>
        </div>

        <div>
          <h2 className="font-semibold text-slate-950 dark:text-white">Quick Links</h2>
          <div className="mt-4 space-y-2 text-sm"><Link className="block hover:text-cyan-600 dark:hover:text-cyan-400" href="/">Home</Link><Link className="block hover:text-cyan-600 dark:hover:text-cyan-400" href="/studios">Explore Studios</Link><Link className="block hover:text-cyan-600 dark:hover:text-cyan-400" href="/how-it-works">How It Works</Link><Link className="block hover:text-cyan-600 dark:hover:text-cyan-400" href="/about">About Us</Link></div>
        </div>

        <div>
          <h2 className="font-semibold text-slate-950 dark:text-white">Popular Categories</h2>
          <div className="mt-4 space-y-2 text-sm">{categories.map(([label, href]) => <Link className="block hover:text-cyan-600 dark:hover:text-cyan-400" href={href} key={href}>{label}</Link>)}</div>
        </div>

      </div>
      <div className="border-t border-slate-200 px-5 py-5 text-center text-sm text-slate-500 dark:border-slate-800"><span>© 2026 StudioSpace. All rights reserved.</span> <Link className="ml-3 hover:text-slate-700 dark:hover:text-slate-300" href="/terms">Terms</Link> <Link className="ml-3 hover:text-slate-700 dark:hover:text-slate-300" href="/privacy">Privacy</Link></div>
    </footer>
  );
}
