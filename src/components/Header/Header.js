import logo from '../../images/mesto-logo.svg'

function Header() {
  return (
    <header className="header content__header">
    <img
    alt="логотип место"
    className="logo header__logo"
    src={logo}
  />
  </header>
  )
}

export default Header