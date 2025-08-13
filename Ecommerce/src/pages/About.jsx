import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsletterBox from "../components/NewsletterBox";

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-[var(--primary)]/5 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-[var(--primary)] mb-4">About Us</h1>
          <p className="text-[var(--muted)] max-w-2xl mx-auto">
            Discover our story, mission, and commitment to bringing you the best fashion experience
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-16">
          {/* Image */}
          <div className="relative">
            <div className="bg-white rounded-3xl p-6 shadow-2xl">
              <img
                src={assets.about_img}
                className="w-full h-auto rounded-2xl"
                alt="About Us"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-[var(--primary)]/10 rounded-full"></div>
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-[var(--secondary)]/10 rounded-full"></div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-[var(--text)] mb-6">Our Story</h2>
              <p className="text-[var(--muted)] leading-relaxed text-lg">
                At FOREVER, we believe great style should be effortless, inclusive, and accessible to everyone. 
                Our online store offers a handpicked collection of modern, comfortable, and high-quality apparel 
                designed to fit every body and every moment—whether you're out making moves or relaxing in your element.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-[var(--primary)] mb-4">Our Mission</h3>
              <p className="text-[var(--muted)] leading-relaxed">
                With a focus on fresh trends, lasting comfort, and eco-conscious choices, we're here to help you 
                express your unique style with confidence. Fast shipping, easy returns, and a customer-first approach 
                make shopping with us as smooth as your favorite tee.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <div className="w-12 h-12 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-[var(--primary)]">5K+</span>
                </div>
                <h4 className="font-semibold text-[var(--text)] mb-2">Happy Customers</h4>
                <p className="text-sm text-[var(--muted)]">Satisfied with our service</p>
              </div>
              
              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <div className="w-12 h-12 bg-[var(--secondary)]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-[var(--secondary)]">500+</span>
                </div>
                <h4 className="font-semibold text-[var(--text)] mb-2">Products</h4>
                <p className="text-sm text-[var(--muted)]">Quality fashion items</p>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-white rounded-3xl p-8 shadow-lg mb-16">
          <h2 className="text-3xl font-bold text-center text-[var(--primary)] mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--primary)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[var(--text)] mb-3">Quality First</h3>
              <p className="text-[var(--muted)]">We never compromise on quality, ensuring every product meets our high standards.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--secondary)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[var(--secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[var(--text)] mb-3">Fast Delivery</h3>
              <p className="text-[var(--muted)]">Quick and reliable shipping to get your fashion items to you as soon as possible.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-[var(--accent)]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 109.75 9.75A9.75 9.75 0 0012 2.25z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[var(--text)] mb-3">Customer Focus</h3>
              <p className="text-[var(--muted)]">Your satisfaction is our priority with 24/7 support and easy returns.</p>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <NewsletterBox />
      </div>
    </div>
  )
}

export default About;
