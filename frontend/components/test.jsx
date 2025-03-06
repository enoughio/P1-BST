// import React, { useState, useEffect, useRef } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ChevronRightIcon } from 'lucide-react';

// const benefits = [
//   {
//     id: 1,
//     title: "Experiential Learning",
//     description: "You can practice and improve your communication and leadership skills by giving speeches and fulfilling club roles and a lot more.",
//     icon: "/icons/experiential-learning.svg", // Replace with your icon path
//     color: "bg-blue-100"
//   },
//   {
//     id: 2,
//     title: "Peer Feedback",
//     description: "You can grow and nurture your public speaking and communication skills through honest and supportive peer evaluation.",
//     icon: "/icons/peer-feedback.svg", // Replace with your icon path
//     color: "bg-green-100"
//   },
//   {
//     id: 3,
//     title: "Mentoring",
//     description: "With support from experienced mentors in your club, you can achieve more than you ever thought possible, both personally and professionally.",
//     icon: "/icons/mentoring.svg", // Replace with your icon path
//     color: "bg-purple-100"
//   },
//   {
//     id: 4,
//     title: "Self-Paced Program",
//     description: "Through opportunities to develop skills at your own pace, you can experience long-lasting growth and a lot more .",
//     icon: "/icons/self-paced.svg", // Replace with your icon path
//     color: "bg-orange-100"
//   }
// ];

// const MembershipBenefits = () => {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [isMobile, setIsMobile] = useState(false);
//   const [isVisible, setIsVisible] = useState({});
//   const benefitsRef = useRef(null);
//   const intervalRef = useRef(null);

//   // Check if mobile
//   useEffect(() => {
//     const checkIfMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
    
//     checkIfMobile();
//     window.addEventListener('resize', checkIfMobile);
    
//     return () => {
//       window.removeEventListener('resize', checkIfMobile);
//     };
//   }, []);

//   // Handle auto-sliding for mobile
//   useEffect(() => {
//     if (isMobile) {
//       intervalRef.current = setInterval(() => {
//         setActiveIndex((prev) => (prev + 1) % benefits.length);
//       }, 2500);
//     }
    
//     return () => {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//       }
//     };
//   }, [isMobile, benefits.length]);
  
//   // Handle scroll animations for desktop
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             setIsVisible(prev => ({ ...prev, [entry.target.dataset.id]: true }));
//           }
//         });
//       },
//       { threshold: 0.3 }
//     );
    
//     if (!isMobile && benefitsRef.current) {
//       const elements = benefitsRef.current.querySelectorAll('.benefit-item');
//       elements.forEach(el => observer.observe(el));
//     }
    
//     return () => {
//       if (!isMobile && benefitsRef.current) {
//         const elements = benefitsRef.current.querySelectorAll('.benefit-item');
//         elements.forEach(el => observer.unobserve(el));
//       }
//     };
//   }, [isMobile]);
  
//   const goToSlide = (index) => {
//     setActiveIndex(index);
//     // Reset timer when manually changing slides
//     if (intervalRef.current) {
//       clearInterval(intervalRef.current);
//       intervalRef.current = setInterval(() => {
//         setActiveIndex((prev) => (prev + 1) % benefits.length);
//       }, 4000);
//     }
//   };

//   return (
//     <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-50">
//       <div className="container mx-auto ">
//         <div className="text-center mb-12">
//           <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
//             Growth Principles That Enhance Your Journey
//           </h2>
//           <p className="text-lg text-gray-600 max-w-3xl mx-auto">
//             All of our education programs are enhanced by the following growth principles:
//           </p>
//         </div>

//         {/* Desktop View */}
//         <div 
//           ref={benefitsRef}
//           className={`${isMobile ? 'hidden' : 'grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 h-'}`}
//         >
//           {benefits.map((benefit, index) => (
//             <div 
//               key={benefit.id}
//               data-id={benefit.id}
//               className={`benefit-item flex items-start p-6 rounded-xl transition-all duration-500 ${benefit.color} transform ${
//                 isVisible[benefit.id] 
//                   ? 'translate-y-0 opacity-100' 
//                   : 'translate-y-10 opacity-0'
//               }`}
//               style={{ transitionDelay: `${index * 150}ms` }}
//             >
//               <div className="flex-shrink-0 mr-5">
//                 <div className="w-16 h-16 flex items-center justify-center bg-white rounded-full shadow-sm">
//                   <img 
//                     src={benefit.icon} 
//                     alt={benefit.title} 
//                     className="w-8 h-8"
//                     onError={(e) => {
//                       e.target.onerror = null;
//                       e.target.src = "/api/placeholder/32/32";
//                     }}
//                   />
//                 </div>
//               </div>
//               <div>
//                 <h3 className="text-xl font-bold mb-2 text-gray-800">{benefit.title}</h3>
//                 <p className="text-gray-700">{benefit.description}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Mobile Carousel */}
//         <div className={`${isMobile ? 'block' : 'hidden'} relative`}>
//           <div className="overflow-hidden py-4">
//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={activeIndex}
//                 initial={{ opacity: 0, x: 50 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -50 }}
//                 transition={{ duration: 0.4 }}
//                 className={`p-6 rounded-xl ${benefits[activeIndex].color}`}
//               >
//                 <div className="flex flex-col items-center text-center">
//                   <div className="w-20 h-20 flex items-center justify-center bg-white rounded-full shadow-md mb-4">
//                     <img 
//                       src={benefits[activeIndex].icon} 
//                       alt={benefits[activeIndex].title} 
//                       className="w-10 h-10"
//                       onError={(e) => {
//                         e.target.onerror = null;
//                         e.target.src = "/api/placeholder/40/40";
//                       }}
//                     />
//                   </div>
//                   <h3 className="text-xl font-bold mb-3 text-gray-800">{benefits[activeIndex].title}</h3>
//                   <p className="text-gray-700">{benefits[activeIndex].description}</p>
//                 </div>
//               </motion.div>
//             </AnimatePresence>
//           </div>

//           {/* Navigation indicators */}
//           <div className="flex justify-center mt-6 space-x-2">
//             {benefits.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => goToSlide(index)}
//                 className={`w-2.5 h-2.5 rounded-full transition-all ${
//                   index === activeIndex 
//                     ? 'bg-blue-600 w-6' 
//                     : 'bg-gray-300'
//                 }`}
//                 aria-label={`Go to slide ${index + 1}`}
//               />
//             ))}
//           </div>
//         </div>

//         {/* CTA Button */}
//         {/* <div className="mt-12 text-center">
//           <a 
//             href="#join-now" 
//             className="inline-flex items-center bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-all hover:bg-blue-700 hover:shadow-lg"
//           >
//             Find A Club
//             <ChevronRightIcon className="ml-2 h-5 w-5" />
//           </a>
//         </div> */}
//       </div>
//     </section>
//   );
// };

// export default MembershipBenefits;