'use client'

// pages/clubs/[clubId].jsx

import React from 'react';
import Head from 'next/head';
import { useSearchParams } from 'next/navigation';

const ClubDetailPage = ( ) => {
    const searchParams = useSearchParams();
    console.log(searchParams.get('club'));

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        {/* <title>{club.name} - Bharat Storytellers</title> */}
      </Head>

       {/* Header Section */}
      <header className="bg-blue-700 text-white py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">{club.name}</h1>
        </div>
        <div className="container mx-auto px-4 mt-2">
          <span className="bg-white/20 px-3 py-1 rounded">
            Club meets: {club.meetingTime}
          </span>
        </div>
      </header>
{/* 
      Main Content */}
      <div className="container mx-auto px-4 py-8 grid md:grid-cols-2 gap-8">
        {/* //  Club Details Column  */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Club Details</h2>
            <div className="space-y-2">
              <p><strong>Club Number:</strong> {club.clubNumber}, Area {club.area}</p>
              <p><strong>Charter Date:</strong> {club.charterDate}</p>
              
              <div className="flex space-x-2 mt-4">
                <a href="#" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Visit Website
                </a>
                <a href="#" className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300">
                  Contact/Visit Club
                </a>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            <div className="space-y-2">
              <p><strong>Meeting Times:</strong> {club.meetingTime}</p>
              <p><strong>Location:</strong> {club.location}</p>
              <p><strong>Phone:</strong> {club.phone}</p>
              <p><strong>Membership Restriction:</strong> {club.membershipRestriction}</p>
            </div>
          </div>
        </div>

         {/* Map and Additional Info Column  */}
        <div>
           Placeholder for Map - In real implementation, use Google Maps or similar 
          <div className="bg-gray-200 h-96 mb-6 rounded-lg flex items-center justify-center">
            Map Placeholder
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">What to Expect with Your Free Club Visit</h2>
            <p>
              When you visit a Storytellers club as a guest, there's no pressure to participate 
              until you are ready and comfortable. Every club is unique; visit as many clubs 
              as you would like to find the right fit for you!
            </p>
          </div>
        </div>
      </div> 
    </div> 
  );
};

export default ClubDetailPage;