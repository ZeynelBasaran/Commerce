import React from 'react'

function Toast() {
  return (
    <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"
    transition: Bounce,
    />
    {/* Same as */}
    <ToastContainer />
  )
}

export default Toast