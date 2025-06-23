import { Link, Outlet } from 'react-router-dom';

function App() {

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          background: 'black'
        }}
      >
        <img
          src="/Logo_Destored.svg"
          style={{
            maxWidth: 50,
          }}
        />
        <h1
          className='text-3xl font-bold'
          style={{
            color: 'white'
          }}
        >
          DESTO<span style={{ color: 'purple' }} >RED</span>
        </h1>
        <nav
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            marginLeft: 'auto',
          }}
        >
          <ul className='flex text-xl gap-5 mr-5 font-bold text'>
            <li className='text-[red]'>
              <Link to="/login">Iniciar Sesión</Link>
            </li>
            <li className='text-white'>
              <Link to="/register">Registrarse</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div style={{ marginTop: 10 }} className="content">
        <Outlet /> {/* This is where your nested routes will render */}
      </div>
    </>
  )
}

export default App
