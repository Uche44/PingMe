import { useEffect, useState } from "react";

const WelcomePage = () => {
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
       const timer = setTimeout(() => setFadeOut(true), 2500);
    return () => clearTimeout(timer);  
    }, [])
return (
<div className="{`welcome w-full h-[100vh] bg-white flex items-center justify-center transition-opacity duration-3000 ease-in-out ${fadeOut ? 'opacity-0' : 'opacity-100'}`}">
<img src="/welcome.svg" alt="logo" className='w-[80%] h-[8rem] fixed'/>
</div>
    )
};
export default WelcomePage;