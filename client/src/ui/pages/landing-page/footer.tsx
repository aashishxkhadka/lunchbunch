import { Facebook, Instagram, Twitter } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";

export function Footer() {
    return (

        <footer className="bg-background p-8">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Logo and Slogan */}
                <div className="flex flex-col items-center md:items-start">
                    <p className="font-bold text-2xl">Lunch Bunch</p>
                    {/* <img src="/placeholder.svg?height=50&width=150" alt="One Bottle Logo" className="h-12 mb-4" /> */}
                    <p className="text-sm text-center md:text-left">Healthy Meals, Anytime, Anywhere. </p>
                    <div className="flex space-x-4 mt-4">
                        <Facebook className="h-5 w-5" />
                        <Instagram className="h-5 w-5" />
                        <Twitter className="h-5 w-5" />
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Our Products</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                        <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
                    </ul>
                </div>
                {/* Contact Information */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                    <address className="not-italic">
                        <p>Buddha Chowk 10</p>
                        <p>Pokhara, GDK 33700</p>
                        <p className="mt-2">Phone: (+977) 433-938</p>
                        <p>Email: info@lunchbunch.com</p>
                    </address>
                </div>

                {/* Newsletter Signup */}
                
            </div>

            {/* Copyright */}
            <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
                <p>&copy; 2024 Lunch Bunch. All rights reserved.</p>
                <p className="mt-2">
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    {' | '}
                    <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                </p>
            </div>
        </footer>
    )
}