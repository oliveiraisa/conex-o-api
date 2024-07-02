import '../css/spinner.css';

export default function Spinner({ loading }) {
    return(
        <div className='back' style={{ display: loading ? 'flex' : 'none' }}>
            <div className="loader"></div>
        </div>
    )
}