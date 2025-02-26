import ClubDetails from '@/components/ui/dashboard/admin/ClubDetails'
import React from 'react'

const Page = async ({ params }) => {
  // Debug: Log the params to see what's actually being received
  // console.log("Params received:", params)
  
  // Extract the id from params
  const admin_id = await params.id
  // console.log("Extracted ID:", admin_id)

  return (
    <div>
        {/* club details along with admin */}
        <ClubDetails admin={admin_id} />
    </div>
  )
}

export default Page