import { Link } from 'react-router-dom'

function App() {

  return (
    
      <div>



        <div>
          <Link to='/departmentList'>
            <button>
              Department
            </button>
        </Link>
        </div>




        <div>
          <Link to='/userList'>
            <button>
              UsersList
            </button>
        </Link>
        </div>

      </div>
        
  )
}

export default App
