import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[var(--primary)]/5 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-[var(--primary)] mb-4">Contact Us</h1>
          <p className="text-[var(--muted)] max-w-2xl mx-auto">
            Get in touch with us for any questions, support, or feedback. We're here to help!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
          {/* Contact Image */}
          <div className="relative">
            <div className="bg-white rounded-3xl p-6 shadow-2xl">
              <img 
                className="w-full h-auto rounded-2xl" 
                src={assets.contact_img} 
                alt="Contact Us" 
              />
            </div>
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-[var(--primary)]/10 rounded-full"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-[var(--secondary)]/10 rounded-full"></div>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-[var(--text)] mb-6">Get in Touch</h2>
              <p className="text-[var(--muted)] leading-relaxed text-lg mb-8">
                We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="font-bold text-xl text-[var(--primary)] mb-4">Our Store</h3>
                <div className="space-y-3 text-[var(--muted)]">
                  <p className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Madhyapur Thimi, Balkumari, Bhaktapur
                  </p>
                  <p className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    9860038759
                  </p>
                  <p className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    anupshrestha141@gmail.com
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="font-bold text-xl text-[var(--secondary)] mb-4">Careers at FOREVER</h3>
                <p className="text-[var(--muted)] mb-4">
                  Learn more about our teams and career opportunities. Join our growing family!
                </p>
                <button className="bg-[var(--secondary)] hover:bg-[var(--accent)] text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl">
                  Explore Careers
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white rounded-3xl p-8 shadow-lg mb-16">
          <h2 className="text-3xl font-bold text-center text-[var(--primary)] mb-8">Send us a Message</h2>
          <form className="max-w-2xl mx-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-[var(--text)] mb-2">First Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-lg border border-[var(--primary)]/20 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-all" 
                  placeholder="Enter your first name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[var(--text)] mb-2">Last Name</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-lg border border-[var(--primary)]/20 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-all" 
                  placeholder="Enter your last name"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-[var(--text)] mb-2">Email Address</label>
              <input 
                type="email" 
                className="w-full px-4 py-3 rounded-lg border border-[var(--primary)]/20 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-all" 
                placeholder="Enter your email"
              />
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-[var(--text)] mb-2">Subject</label>
              <select className="w-full px-4 py-3 rounded-lg border border-[var(--primary)]/20 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-all">
                <option>General Inquiry</option>
                <option>Product Support</option>
                <option>Order Status</option>
                <option>Returns & Exchanges</option>
                <option>Feedback</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-semibold text-[var(--text)] mb-2">Message</label>
              <textarea 
                rows={6}
                className="w-full px-4 py-3 rounded-lg border border-[var(--primary)]/20 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] transition-all resize-none" 
                placeholder="Tell us how we can help you..."
              ></textarea>
            </div>
            
            <div className="text-center">
              <button 
                type="submit"
                className="bg-[var(--primary)] hover:bg-[var(--accent)] text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>

        {/* Newsletter */}
        <NewsletterBox />
      </div>
    </div>
  )
}

export default Contact
