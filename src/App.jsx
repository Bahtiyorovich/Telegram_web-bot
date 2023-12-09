import './App.css'
import { getData } from './constants/db';
import Card from './components/card/card';

const courses = getData();

const App = () => {
  return (
    <>
      <h1>Web Dasturlash kurlari</h1>
      {/* cart */}
      <div className="cards_container">
         {courses.map(course => (
          <Card key={course.id} course={course}/>
         ))}
      </div>
    </>
  )
}

export default App