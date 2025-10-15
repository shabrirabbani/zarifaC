"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Contact() {
  return (
    <div className="pt-6 md:pt-24 max-w-7xl mx-auto">
      <section className="py-16 px-6 md:px-12">
        <div className="mb-8 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-wider text-center text-gray-900">
            Contact Us
          </h2>
          <p className="text-gray-500 mt-2 text-center ">
            Have questions? Feel free to reach out to us.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {/* LEFT: FORM */}
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="Enter your full name" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="Enter your email" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Write your message here..." />
            </div>

            <Button type="submit" className="w-full md:w-auto rounded-none">
              Send Message
            </Button>
          </form>

          {/* RIGHT: MAP + SOCIALS */}
          <div className="space-y-6">
            <div className="w-full h-72 md:h-96 rounded-lg overflow-hidden shadow">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3952.031701380801!2d110.40904267414563!3d-7.887992692122071!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a56c5e0f5569f%3A0x7f7d6dd4a4f4c4cf!2sYogyakarta!5e0!3m2!1sen!2sid!4v1696329600000!5m2!1sen!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

            <div className="flex justify-center md:justify-start space-x-6">
              <a
                href="#"
                className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition"
              >
                <Facebook className="w-5 h-5 text-gray-700" />
              </a>
              <a
                href="#"
                className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition"
              >
                <Instagram className="w-5 h-5 text-gray-700" />
              </a>
              <a
                href="#"
                className="p-3 rounded-full bg-gray-100 hover:bg-gray-200 transition"
              >
                <Twitter className="w-5 h-5 text-gray-700" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
