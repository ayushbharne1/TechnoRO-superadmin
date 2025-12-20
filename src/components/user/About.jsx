import React from 'react'
import aboutus from '../../assets/aboutus.png'

const About = () => {
  return (
    <div className='flex flex-col m-2'>
      <div className='flex items-center md:my-5 justify-between'>
        <hr className='h-[3px] bg-[#606060] border-none font-bold w-[670px] ' />
        <p className='font-semibold text-[25px]'>About Us</p>
        <hr className='h-[3px] bg-[#606060] border-none font-bold w-[670px]  '  />
      </div>

      <div className='flex border space-x-6 border-[#CACACA] md:p-[24px]'>
        <img  className='md:w-[650px] md:h-[610px] ' src={aboutus} />
        <div className='md:w-[650px] md:h-[600px] '>
          <h1 className='text-[#7EC1B1] text-[32px] font-semibold '>Who We are !</h1>
          <p className='text-[22px] text-justify text-[#263138] '>At Techno RO we are committed to delivering high-quality water filtration solutions that ensure your access to clean and safe drinking water. With 20 years of experience in the water treatment industry, we specialize in providing reliable and efficient RO services for both residential and commercial needs.<br/>
          Our team of skilled professionals is dedicated to offering top-notch installation, maintenance, and repair services for RO systems, designed to meet the unique needs of each customer. We use advanced technology and high-grade components to guarantee the highest level of purification, ensuring that your water is free from contaminants and meets all health standards.
          <br/><br/>
          At Techno RO, we believe that clean water is essential for a healthy life. That’s why we go the extra mile to ensure your RO system works at its best, providing you with pure, fresh water every day.
        </p>
        </div>
      </div>

      <div className=" mx-auto p-6 text-gray-800">
      {/* Our Mission Section */}
      <section className=" p-2 ">
        <h2 className="text-[25px] font-semibold">Our Mission</h2>
        <p className='h-[72px ] text-[22px]  md:mt-3'>
          Our mission is to provide every customer with pure, fresh water, helping to improve the
          quality of life for our community, one drop at a time.
        </p>
      </section>

      {/* Core Values Section */}
      <section className="mt-8 p-2">
        <h2 className="text-2xl font-semibold text-[25px]">Core Values</h2>
        <ul className="space-y-2 mt-2  text-[22px] md:mt-3">
          {[
            "Integrity: We believe in honest, transparent service with no hidden fees.",
            "Customer-Centric: Your satisfaction is our priority, and we customize every solution to your needs.",
            "Innovation: We continuously embrace new technologies to ensure the highest quality of water purification.",
            "Sustainability: We are committed to eco-friendly practices that conserve resources and protect the environment."
          ].map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="text-[#7EC1B1] text-2xl mr-2">●</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Why Choose Us Section */}
      <section className="mt-8 p-2">
        <h2 className="text-2xl font-semibold text-[25px]">Why Choose Us?</h2>
        <ul className="space-y-2 mt-2 text-[22px] md:mt-3">
          {[
            "Expert Technicians: Certified and experienced professionals ready to assist.",
            "Custom Solutions: Tailored systems designed to fit your home or business needs.",
            "Reliable Service: Quick response times and dependable service when you need it most.",
            "Affordable Pricing: Cost-effective solutions without compromising quality.",
            "Eco-Friendly Commitment: We prioritize sustainable practices and water conservation."
          ].map((item, index) => (
            <li key={index} className="flex items-start">
              <span className="text-[#7EC1B1] text-2xl mr-2">●</span>
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Awards and Certifications */}
      <section className="mt-8  p-2">
        <h2 className="text-2xl font-semibold text-[25px]">Awards and Certifications</h2>
        <p className=' text-[22px] md:mt-3'>
          We are proud to be certified by [Certification Body], recognized for our commitment to excellence in water
          treatment and purification services.
        </p>
      </section>

      {/* Contact Us Section */}
      <section className="mt-8 p-2">
        <h2 className="text-2xl font-semibold text-[25px]">Contact Us</h2>
        <p className=' text-[22px] md:mt-3'>
          Ready to experience the benefits of purified water? Get in touch with us today for a free consultation, and let us
          help you find the perfect solution for your water needs.
        </p>
        <div className="flex justify-center gap-2 mt-4">
          <input
            type="email"
            placeholder="Enter your email address"
            className="border border-gray-300 px-4 py-2 rounded-md w-[488px]"
          />
          <button className="bg-[#7EC1B1] text-white px-4 py-2 rounded-md">Get in Touch</button>
        </div>
      </section>
    </div>
    </div>
  )
}

export default About
