import React from 'react'


//TODO : fetch club and admin details form the backedn


const ClubDetails = (props) => {
    const admin_id = props.admin
    console.log("Extracted ID:", admin_id)

  return (
    <div>
        <h1>{admin_id}</h1>
        {/* club details along */}



    </div>
  )
}

export default ClubDetails