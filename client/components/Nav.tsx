import { useAuth0 } from '@auth0/auth0-react'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated.tsx'
import { NavGroup, NavButton } from './Styled.tsx'

import { Link } from 'react-router-dom'

function Nav() {
  const { user, logout, loginWithRedirect } = useAuth0()

  const handleSignOut = () => {
    logout()
  }

  const handleSignIn = () => {
    loginWithRedirect()
  }

  return (
    <>
      <NavGroup>
        <IfAuthenticated>
          <Link to="/my-travel">
            <button className="btn start-btn">My travel</button>
          </Link>
          <NavButton className="btn" onClick={handleSignOut}>
            Sign out
          </NavButton>
          {user && <p>Signed in as: {user?.nickname}</p>}
        </IfAuthenticated>
        <IfNotAuthenticated>
          <NavButton className="btn" onClick={handleSignIn}>
            Sign in
          </NavButton>
        </IfNotAuthenticated>
      </NavGroup>
      <Link to="/"><h1>Travel 4 you!</h1></Link>
    </>
  )
}

export default Nav
