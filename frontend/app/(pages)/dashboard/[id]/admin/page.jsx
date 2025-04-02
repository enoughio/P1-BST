import ClubDetails from '@/components/ui/dashboard/admin/ClubDetails'
import React, { use } from 'react'

// TODO: fetch data of admin of the club and pass that admin name to club detaisl component

const adminData = {
  name: 'John Doe',
  username: 'johndoe',
  email: "jhon@example.com",
  isStaff: 'admin',
  clubId: "21A",
  clubName: "Club Name",
}


const page = () => {
  return (
    <div>

      <ClubDetails  clubId={adminData.clubId} />
      

    </div>
  )
}

export default page