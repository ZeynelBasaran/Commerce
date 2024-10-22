import React, { useState } from 'react'


function useToggle() {

    const [open, setOpen] = useState(false);

    const changeFunc = () =>{
        setOpen(!open)
        console.log(open)
    }

    return {
        open,changeFunc
    }
        
    
}

export default useToggle