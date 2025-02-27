import React from 'react'
import { fetchClubData } from '@/utils/club.js'

// TODO: fetch data of admin of the club and pass that admin name to club detaisl component

const ClubDetails = ({props}) => {

    const {clubId} = props
    const clubData = fetchClubData(clubId)

  return (
    <div>ClubDetails</div>
  )
}

export default ClubDetails