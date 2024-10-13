import './App.css'
import AdminPanel from './AdminPanel';
import LoginForm from './LoginForm';

function App() {

  let content;
  let isLoggedIn = true;

if (isLoggedIn) {
  content = <AdminPanel />;
} else {
  content = <LoginForm />;
}

  return(
    <>
     <h1>Welcome to my App!</h1>
     {content}
    </>
  )
}

export default App