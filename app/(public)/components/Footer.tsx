"use client";

import Image from "next/image";
import {
  Mail,
  Phone,
  MapPin,
  Clock3,
  ShieldCheck,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-slate-200 bg-[#f7f8fb] text-slate-700">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.08),transparent_55%)] pointer-events-none" />

      {/* Responsive Skyline Images */}
      {/* Desktop Skyline */}
      <div className="absolute bottom-0 left-1/2 w-full -translate-x-1/2 pointer-events-none select-none hidden lg:block">
        <Image
          src="/images/footer_desktop.png"
          alt="Government Building Skyline"
          width={1600}
          height={260}
          className="w-full h-auto object-contain"
          priority={false}
        />
      </div>

      {/* Mobile Skyline */}
      <div className="absolute bottom-0 left-1/2 w-full -translate-x-1/2 pointer-events-none select-none lg:hidden">
        <Image
          src="/images/footer_mobile.png"
          alt="Government Building Skyline Mobile"
          width={400}
          height={150}
          className="w-full h-auto object-contain"
          priority={false}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-5 md:grid-cols-2">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3">
              <Image
                src="/images/nova_logo.png"
                alt="Nova IT Solutions Logo"
                width={48}
                height={48}
                className="h-12 w-12 object-contain"
              />

              <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                  NOVA
                </h2>
                <p className="text-xs tracking-[0.25em] text-slate-500 uppercase">
                  IT Solutions
                </p>
              </div>
            </div>

            <p className="mt-6 text-sm leading-7 text-slate-600">
              Secure, scalable, and innovative IT solutions built for modern
              government and enterprise operations.
            </p>

            <div className="mt-6 flex items-center gap-4">
              <a
                href="#"
                className="rounded-full border border-slate-300 p-2 transition hover:border-blue-500 hover:text-blue-600"
              >
                <span className="sr-only">LinkedIn</span>
                in
              </a>

              <a
                href="#"
                className="rounded-full border border-slate-300 p-2 transition hover:border-blue-500 hover:text-blue-600"
              >
                <span className="sr-only">Facebook</span>
                f
              </a>

              <a
                href="#"
                className="rounded-full border border-slate-300 p-2 transition hover:border-blue-500 hover:text-blue-600"
              >
                <span className="sr-only">Email</span>
                @
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900">
              Company
            </h3>

            <ul className="mt-5 space-y-3 text-sm">
              {[
                "About Us",
                "Services",
                "Careers",
                "News & Insights",
                "Contact",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="transition hover:text-blue-600"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900">
              Solutions
            </h3>

            <ul className="mt-5 space-y-3 text-sm">
              {[
                "IT Modernization",
                "Cybersecurity",
                "Cloud Solutions",
                "Data Analytics",
                "Managed IT Services",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="transition hover:text-blue-600"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Certifications */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900">
              Certifications
            </h3>

            <div className="mt-5 space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <span>SAM.gov Registered</span>
              </div>

              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <span>UEI Verified</span>
              </div>

              <div className="flex items-center gap-3">
                <ShieldCheck className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <span>ISO 27001 Ready</span>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900">
              Contact
            </h3>

            <div className="mt-5 space-y-5 text-sm">
              <div className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 text-blue-600" />
                <span>(919) 351-5040</span>
              </div>

              <div className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 text-blue-600" />
                <span>info@novateam.team</span>
              </div>

              <div className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 text-blue-600" />
                <span>
                  301 S McDowell St, Suite 125
                  <br />
                  Charlotte NC 28204
                </span>
              </div>

              <div className="flex gap-3">
                <Clock3 className="mt-0.5 h-4 w-4 text-blue-600" />
                <span>Mon - Fri: 9AM - 5PM EST</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 flex flex-col items-center justify-between gap-5 border-t border-slate-200 pt-6 text-sm text-slate-500 md:flex-row">
          <p>© 2026 Nova IT Solutions. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-6">
            <a href="#" className="hover:text-blue-600">
              Privacy Policy
            </a>

            <a href="#" className="hover:text-blue-600">
              Terms of Service
            </a>

            <a href="#" className="hover:text-blue-600">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}