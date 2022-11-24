import { FileAddOutlined } from '@ant-design/icons';
import { Input, Button, theme } from 'antd';
import { useEffect, useRef, useState } from 'react';
import List from '../List/list';
import './input.css';
import { db, collection, addDoc, deleteDoc, doc, query, onSnapshot, orderBy, updateDoc } from '../../config/firebase';

const InputField = () => {

    const [currValue, setCurrValue] = useState('');
    const [todoItems, setTodoItems] = useState({ value: [], id: [] });
    const inputRef = useRef();

    useEffect(() => {

        const q = query(collection(db, "todos"), orderBy('timestamp', 'desc'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            setTodoItems({ value: [], id: [] })
            querySnapshot.forEach((doc) => {
                setTodoItems(v => {
                    return { value: [...v.value, doc.data().todo], id: [...v.id, doc.id] }
                })
            });
        });

    }, [])

    const addTodo = () => {
        if (currValue) {
            addDoc(collection(db, "todos"), {
                todo: currValue,
                timestamp: new Date(),
            })
        }
        setCurrValue('');
        inputRef.current.input.focus();
    }

    const deleteAll = async () => {
        todoItems.id.forEach(async (v, i) => {
            await deleteDoc(doc(db, "todos", v));
        });
        setCurrValue('');
        inputRef.current.input.focus();

    }

    const delTodo = async (index) => {
        await deleteDoc(doc(db, "todos", todoItems.id[index]));
    }

    const submitted = (e) => {
        e.preventDefault();
        addTodo();
    }

    return (
        <div className="InputField">
            <form onSubmit={submitted}>
                <Input ref={inputRef} status='error' onChange={(e) => setCurrValue(e.target.value)} value={currValue} className='input' autoCorrect='off' style={{ borderRadius: '10', theme: '#2962ff', border: '#2962ff' }} size="large" placeholder="What do you want todo?" prefix={<FileAddOutlined />} />
                <div className="buttons">
                    <Button onClick={addTodo}> Add Todo </Button>
                    <Button onClick={deleteAll}> Delete All </Button>
                </div>
                <div className='todoList'>
                    <List todoItems={todoItems} delTodo={delTodo} />
                </div>
            </form>
        </div >
    )
}

export default InputField;