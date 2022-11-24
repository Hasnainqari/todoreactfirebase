import './list.css';
import { Button } from 'antd';
import ModalForEdit from '../Modaal/modal';
import { useState } from 'react';

const List = ({ todoItems, delTodo }) => {

    const [open, setOpen] = useState(false);
    const [currEdit, setCurrEdit] = useState({});

    const closingModal = () => {
        setOpen(false);
    }

    const editingTodo = (v, i) => {
        setOpen(true);
        setCurrEdit({ v, i });
    }

    return (
        <div className='List'>
            <ol>
                { todoItems.value.map((v, i) => (
                    <li key={i}>
                        <span>{v}</span>
                        <span className='listButtons'>
                            <Button onClick={() => editingTodo(v, i)}> Edit Todo </Button>
                            <Button onClick={() => delTodo(i)}> Delete Todo </Button>
                        </span>
                    </li>
                ))}
                <ModalForEdit todoList={todoItems} todoItem={currEdit} openingModal={open} openFunc={closingModal} />
            </ol>
        </div>
    )
}

export default List;