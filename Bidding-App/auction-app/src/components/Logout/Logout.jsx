import React from 'react'

function Logout() {
    localStorage.removeItem('user');
  return (
    <div>You are logged out.</div>
  )
}

export default Logout