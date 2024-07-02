import '../css/card.css'

export default function Card(props) {
    return(
        <div className='card-container'>
            <div className='card-title'>
                <h1>{props.name}</h1>
            </div>
            <figure className='sprite'>
                <img src={props.sprite}></img>
            </figure>
            <div className='info-container'>
                <h2>Status: {props.status}</h2>
                <h2>Species: {props.species}</h2>
                <h2>Gender: {props.gender}</h2>
                <h2>Origin: {props.origin}</h2>
                <h2>Location: {props.location}</h2>
            </div>
        </div>
    )
}