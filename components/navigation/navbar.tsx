import NavDropDownMenu from './NavDropDownMenu'

export default function Navbar() {
  return (
    <div className='w-full flex flex-row justify-between items-center h-20'>
      <div className='text-3xl font-bold'>Logo</div>
      <div><NavDropDownMenu /></div>
    </div>
  )
}
