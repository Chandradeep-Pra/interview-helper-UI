import { useGSAP } from '@gsap/react';
import manOnRocket from '../assets/manOnRocket.png';
import moon from '../assets/moon.png'
import gsap from 'gsap';

const Landinglogo = () => {

    useGSAP(() => {
        gsap.from('#moon',{
            x:1000,
            y:-300,
            duration:2,
            scale:10,
            ease:"power1.inOut",
            opacity:0.1
        })

        gsap.from('#rocket',{
            opacity:0,
            duration:1,
            y:100
        })
    },[])
  return (
    <div className='rounded-lg  w-2/6'>
        
          
          <img 
            src={moon} 
            alt="Moon"
            id='moon'
            style={{ 
              width: '100%', 
              height: 'auto', 
              position: 'relative', 
        
            }} 
          />
          <img 
            src={manOnRocket} 
            alt="Rocket"
            id='rocket'
            style={{ 
              width: '80%', 
              height: 'auto', 
              position: 'relative', 
              bottom: '50%',
              left: '20%', 
              zIndex: 10
            }} 
          />
         
          
        </div>
  )
}

export default Landinglogo