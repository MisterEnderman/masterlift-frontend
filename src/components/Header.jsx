import React from 'react'
import { Link } from 'react-router-dom'
import LoginButton from './LoginButton'
import { Show, UserButton, SignInButton, useUser } from '@clerk/react';
const Header = () => {
    const { user } = useUser();
    return (
        <header>
            <Link to={'/'}>
                <div className="logo">PR<span>O</span>JECT X</div>
            </Link>

            <nav>
                <Link to={'/about'} className='menu__link'>ABOUT</Link>
                <Link to={'/create'} className='menu__link'>CREATE PLAN</Link>

                {
                    user &&
                    <Link to={'/myplans'} className='menu__link'>MY PLANS</Link>
                }
            </nav>

            <Show when="signed-out">
                <SignInButton mode="modal">
                    <div>
                        <LoginButton />
                    </div>
                </SignInButton>
            </Show>

            <Show when="signed-in">
                <UserButton afterSignOutUrl="/" />
            </Show>
        </header>
    )
}

export default Header