import React, { useContext } from 'react'
import "./navbar.scss"
import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ListIcon from '@mui/icons-material/List';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { DarkModeContext } from '../../../context/darkModeContext';


const Navbar = () => {
    const {dispatch} = useContext(DarkModeContext)
  return (
    <div className='navbar'>
        <div className='wrapper'>
            <div className='search'>
                <input type="text" placeholder='search ...' />
                <SearchIcon />
            </div>
            <div className='items'>
                <div className='item'>
                    <LanguageIcon  className='icon'/>
                    English
                </div>
                <div className='item'>
                    <DarkModeIcon className='icon' onClick={()=> dispatch({ type:"TOGGLE"})}/>
                </div>
                <div className='item'>
                    <FullscreenExitIcon className='icon'/>
                </div>
                <div className='item'>
                    <NotificationsNoneIcon className='icon'/>
                    <div className='counter'>1</div>
                </div>
                <div className='item'>
                    <ChatBubbleOutlineIcon className='icon'/>
                    <div className='counter'>2</div>
                </div>
                <div className='item'>
                    <ListIcon className='icon'/>
                </div>
                <div className='item'>
                   <img 
                    src="https://stock.adobe.com/images/cartoon-style-of-a-woman-ready-to-serve-on-the-beach-volleyball-summer/628659839"
                    className='image'  
                   />
                </div>
            </div>
        </div>

    </div>
  )
}

export default Navbar