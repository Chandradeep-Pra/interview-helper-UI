import React, { useState, useEffect } from 'react'

const useResponsive = (breakPoints) => {
    const [index, setindex] = useState(0);

    useEffect(() => {
      
        const updateIndex = () => {
            const w = window.innerWidth;
            const newIndex = breakPoints.findIndex((bp) => w <= bp);

            setindex(newIndex === -1 ? breakPoints.length : newIndex)
        };

        updateIndex();
        window.addEventListener("resize",updateIndex);
        return () => window.removeEventListener("resize",updateIndex)
    }, [breakPoints])
    
  return index;
}

export default useResponsive