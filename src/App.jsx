import { Link } from 'react-router-dom'

function App() {

  return (
    
      <div>
        <div>

        <Link to='/userDetail'>
          <button>
           profile
          </button>
        </Link>
        </div>
        <div>
          <Link to='/updateUser'>
            <button>
              department
            </button>
        </Link>
        </div>
        <div>
          <Link to='/updateUser'>
            <button>
              usersList
            </button>
        </Link>
        </div>

      </div>
        
  )
}

export default App
