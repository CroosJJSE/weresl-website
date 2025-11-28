import Link from 'next/link';
import { Facebook, Instagram, Youtube } from 'lucide-react';

const projects = [
  { href: '/ark', label: 'Ark' },
  { href: '/eden', label: 'Eden' },
  { href: '/embrace', label: 'Embrace' },
  { href: '/invicta', label: 'Invicta' },
  { href: '/keystone', label: 'Keystone' },
  { href: '/metamorphosis', label: 'Metamorphosis' },
];

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Contact Info */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="tel:+94777342685" className="hover:text-orange-400 transition-colors">
                  (+94) 77 734 2685
                </a>
              </li>
              <li>
                <a href="mailto:hello@weresl.org" className="hover:text-orange-400 transition-colors">
                  hello@weresl.org
                </a>
              </li>
              <li>Sri Lanka</li>
            </ul>
          </div>

          {/* Projects */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Our Projects</h4>
            <ul className="space-y-2">
              {projects.map((project) => (
                <li key={project.href}>
                  <Link
                    href={project.href}
                    className="text-sm hover:text-orange-400 transition-colors"
                  >
                    {project.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-heading font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="https://web.facebook.com/weresl"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-400 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://www.instagram.com/were_srilankan/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-400 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://www.youtube.com/@weresl"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-400 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-6 w-6" />
              </a>
              <a
                href="https://wa.me/+94777342685"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-orange-400 transition-colors"
                aria-label="WhatsApp"
              >
                <span className="text-lg">💬</span>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} WE'RE SL. All rights reserved.</p>
          <p className="mt-2">
            Design by{' '}
            <a 
              href="https://churchcreatives.lk/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-orange-400 transition-colors"
            >
              Church Creative LK
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

