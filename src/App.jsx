import { useEffect, useState } from 'react'
import './App.css'
import Card from './components/Card'
import Spinner from './components/Spinner'

function App() {
  const [name, setName] = useState('');
  const [character, setCharacter] = useState([]);
  const [error, setError] = useState('')
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false)

  const handleSubmit = () => {
    setName(document.getElementById('nameInput').value);
    setPage(document.getElementById('pageInput').value);
  }

  const fetchCharacters = (name, page) => {   
      setLoading(true);
      fetch(`https://rickandmortyapi.com/api/character/?name=${name}&page=${page}`)
        .then(response => response.json())
        .then(data => {
          setCharacter(data.results || []);
          console.log(data.results)
          if(data.results == undefined) {
            setError('No characters found');
          } else {
            setError('')
          }
          console.log(error)
          setLoading(false);
        })
        .catch(error => {
          console.log(error);
          setError(error)
          setLoading(false);
        });
    };
  
    useEffect(() => {
      if (loading) {
        document.body.style.overflow = 'hidden';
        console.log('Loading started...');
      } else {
        document.body.style.overflow = 'auto';
        console.log('Loading ended.');
      }
  
      // Cleanup on component unmount
      return () => {
        document.body.style.overflow = 'auto';
      };
    }, [loading]);
  
   useEffect(() => {
    fetchCharacters(name, page);
   }, [name, page]);

  return (
    <>
      <Spinner loading={loading}/>
      <div>
        <div className='form'>
          <div>
            <label htmlFor="nameInput">Name: </label>
            <input type='text' defaultValue={name} id='nameInput'></input>
          </div>
          <div>
            <label htmlFor="nameInput">Page: </label>
            <input type='number' defaultValue={1} id='pageInput'></input>
          </div>

          <button onClick={handleSubmit}>Search</button>
        </div>

        <div className='error'>
          <h1>{error}</h1>
        </div>

        <div className='characters'>
          {
            character && Array.isArray(character) &&
            character.map((char, index) => (
              <Card 
                name={char.name}
                sprite={char.image}
                status={char.status}
                species={char.species}
                gender={char.gender}
                origin={char.origin.name}
                location={char.location.name}
              />
            ))
          }
        </div>
      </div>
    </>
  )
}

export default App
