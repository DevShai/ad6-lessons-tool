import logo from './logo.svg';
import './App.css';
import LessonsList from './components/LessonsList';

function App() {
  return (
    <div className="App">
      <h1>Ad6 Admin Tool</h1>

      <LessonsList lessons={["a", "b"]}/>
    </div>
  );
}

export default App;
