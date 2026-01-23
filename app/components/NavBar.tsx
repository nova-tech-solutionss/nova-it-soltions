'use client'

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";



export default function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const router = useRouter();

    const industries = [
                    {
                        name: 'Healthcare',
                        href: '/industries/healthcare'
                    },,
                    {
                        name: 'Legal',
                        href: '/industries/legal'
                    },
                    {
                        name: '(AEC)',
                        href: '/industries/aec'
                    },
                    {
                        name: 'Government',
                        href: '/industries/government'
                    },
                    {
                        name: 'Other',
                        href: '/industries/other'
                    },

                ]
    
    const what_section = [
        {
            name: 'Fix Operational Systems',
            href: '/services/custom-enterprise-software'
        },
        {
            name: "Simiplify Workflows",
            href: '/services/digital-experience'
        },
        {
            name: "Reduce Manual Work",
            href: '/services/ai-automation'
        },
        {
            name: 'Improve Visibility & Control',
            href: '/services/enterprise-portal'
        }
    ]

    const how_section = [
        {
            name: 'Our Approach',
            href: '/how-we-work/approach',

        },
        {
            name: 'Clarity Before Code',
            href: '/how-we-work/clarity-before-code'

        },
        {
            name: 'Security & Complaince',
            href: '/how-we-work/security-and-complaince'
        }
    ]

    const company = [
        {
            name: 'About Us',
            href: '/about'
        },
        {
            name: 'Contact Us',
            href: '/contact'
        }
    ]

    const Dropdown = ({ label, items }: { label: string; items: any[] }) => (
            <div
            className="relative"
            onMouseEnter={() => setOpenDropdown(label)}
            onMouseLeave={() => setOpenDropdown(null)}
            >
            <button className="flex flex-inline items-center justify-center text-sm text-gray-700 transition-transform duration-200 hover:scale-105 hover:text-blue-600 transition">
                {label} <ChevronDown className="w-4 h-4" />
            </button>

            {openDropdown === label && (
                <div className="absolute top-full mt-2 w-64 bg-white shadow-lg rounded-lg py-2 z-50">
                {items.map((item) => (
                    <Link
                    key={item.name}
                    href={item.href}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                    {item.name}
                    </Link>
                ))}
                </div>
            )}
            </div>
        );
    return (
    <nav className="sticky top-0 z-50 bg-white w-full px-6 py-4 relative">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
                <Link href="/" className="inline-flex gap-2 items-center">
                    <Image src={'/images/nova_logo.png'} alt="Nova Suite" width={34} height={34} />
                    <span className="text-2xl font-medium text-gray-900 inline ml-4">Nova</span>
                </Link>
                
            </div>

            {/* Burger Icon */}
            <button
            className="md:hidden flex flex-col justify-center space-y-1.5 z-20"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Menu"
            >
            <div
                className={`h-0.5 w-6 bg-black transition-transform duration-300 ${
                menuOpen ? 'rotate-45 translate-y-[6px]' : ''
                }`}
            />
            <div
                className={`h-0.5 w-6 bg-black transition-all duration-300 ${
                menuOpen ? 'opacity-0' : ''
                }`}
            />
            <div
                className={`h-0.5 w-6 bg-black transition-transform duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-[10px]' : ''
                }`}
            />
            </button>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center space-x-8">
                <Dropdown label="Company" items={company} />
                <Link href="/services" className="flex flex-inline items-center justify-center text-sm text-gray-700 transition-transform duration-200 hover:scale-105 hover:text-blue-600 transition">
                    Services
                </Link>
                
                <Link
                    href="/contact"
                    className="bg-black text-white text-sm font-medium px-4 py-2 rounded-full transform transition-transform duration-200 hover:scale-105 hover:opacity-80 "
                >
                    Contact Us
                </Link>
            </div>
        </div>

        {/* Mobile Dropdown */}
        <div
            className={`md:hidden absolute left-0 top-full w-full bg-white px-6 overflow-hidden transition-all duration-300 ${
            menuOpen ? 'max-h-[900px] py-6' : 'max-h-0 py-0'
            }`}
        >
            <div className="flex flex-col items-center text-center space-y-4">

                {[{ label: 'What We Do', items: what_section },
                    { label: 'Industries', items: industries },
                    { label: 'How We Work', items: how_section },
                    { label: 'Company', items: company }
                ].map(section => (
                    <div key={section.label}>
                    <p className=" font-bold text-lg text-gray-900 mb-2">{section.label}</p>
                    {section.items.map(item => (
                        <Link
                        key={item?.name}
                        href={item?.href || '#'}
                        onClick={() => setMenuOpen(false)}
                        className="block text-md text-gray-700 py-1"
                        >
                        {item?.name}
                        </Link>
                    ))}
                    </div>
                ))}
                <button
                    onClick={() => {
                        setMenuOpen(false)
                        router.push('/contact')
                    }}
                    className="bg-black text-white text-sm font-medium px-4 py-2 rounded-full hover:opacity-90 transition"
                >
                    Get Started
                </button>
            </div>
        </div>
    </nav>
    )

}