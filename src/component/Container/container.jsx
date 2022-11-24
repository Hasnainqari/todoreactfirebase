import './container.css';
import InputField from '../Input/input';

const Container = () => {
    return (
        <div className='Container'>
            <h1 className='heading'>Todo App With React <span className='spanplus'>+</span> Firebase</h1>
            <InputField />
        </div>
    )
}

export default Container;