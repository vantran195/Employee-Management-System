import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import './App.css';
import './assets/styles/global.css';
import Header from './components/header';
import Home from './page/Home';

function App() {
  const { token, currentUser } = useSelector((state) => state.auth);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="App">
      <Header />
      <Home role={currentUser?.role} />
    </div>
  );
}

export default App;