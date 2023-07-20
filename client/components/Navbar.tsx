import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'

export default function Navbar() {
  const [showMenu, setShowMenu] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [showLinks, setShowLinks] = useState(window.innerWidth > 720)

  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      toggleMenu()
    }
  }

  const closeMenu = () => {
    setShowMenu(false)
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
      setShowLinks(window.innerWidth > 720)
      if (showMenu && window.innerWidth > 720) {
        setShowMenu(false)
      }
    }
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [showMenu])

  return (
    <div className={`navbar${showMenu ? ' show-menu' : ''}`}>
      {windowWidth <= 720 && (
        <div
          onClick={toggleMenu}
          role="button"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          className="menu-icon"
        >
          <FontAwesomeIcon icon={faBars} />
        </div>
      )}
      <div className="h1-header">
        <h1 style={{ visibility: showMenu ? 'hidden' : 'visible' }}>
          SCOTTY THE FOOTY
        </h1>
      </div>
      {showMenu && (
        <div className={`routes${showMenu ? ' slide-in' : ''}`}>
          <h3>
            <Link to="/" onClick={closeMenu}>
              Home
            </Link>
          </h3>
          <h3>
            <Link to="/team" onClick={closeMenu}>
              Teams
            </Link>
          </h3>
          <h3>
            <Link to="/fixture" onClick={closeMenu}>
              Fixtures
            </Link>
          </h3>
          <h3>
            <Link to="/standings" onClick={closeMenu}>
              Standings
            </Link>
          </h3>
          <h3>
            <Link to="/stats" onClick={closeMenu}>
              Stats
            </Link>
          </h3>
          <div
            onClick={closeMenu}
            role="button"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            className="close-menu"
          >
            <FontAwesomeIcon icon={faTimesCircle} />
          </div>
        </div>
      )}
      {showLinks && (
        <div className={`routes${showMenu ? ' slide-in' : ''}`}>
          <h3>
            <Link to="/">Home</Link>
          </h3>
          <h3>
            <Link to="/team">Teams</Link>
          </h3>
          <h3>
            <Link to="/fixture">Fixtures</Link>
          </h3>
          <h3>
            <Link to="/standings">Standings</Link>
          </h3>
          <h3>
            <Link to="/stats">Stats</Link>
          </h3>
        </div>
      )}
    </div>
  )
}
