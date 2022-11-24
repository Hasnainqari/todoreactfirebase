import React, { useEffect, useState } from 'react';
import { Input, Modal } from 'antd';
import { FileAddOutlined } from '@ant-design/icons';
import './modal.css';
import { db, collection, addDoc, deleteDoc, doc, query, onSnapshot, orderBy, updateDoc } from '../../config/firebase';

const ModalForEdit = ({ openingModal, openFunc, todoItem, todoList }) => {
    const [confirmLoading, setConfirmLoading] = useState(false);
    const modalText = 'Your Todo is updating...'
    const [modalInput, setModalInput] = useState('');


    useEffect(() => {

        setModalInput(todoItem.v)

    }, [openingModal])


    const handleOk = async () => {
        setConfirmLoading(true);
        await updateTodo();
        openFunc();
        setConfirmLoading(false);
    };

    const handleCancel = () => {
        openFunc();
    };

    const updateTodo = async () => {
        const todoRef = doc(db, "todos", todoList.id[todoItem.i]);
        await updateDoc(todoRef, {
            todo: modalInput,
            timestamp: new Date(),
        });
    }

    return (
        <div className='ModalForEdit'>
            <Modal
                className='modal'
                title="Edit Todo"
                open={openingModal}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                {!confirmLoading ? <Input value={modalInput} onChange={(e) => setModalInput(e.target.value)} status='error' className='input' autoCorrect='off' style={{ borderRadius:  '0', margin: '30px 0'}} size="large" placeholder="Edit Todo" prefix={<FileAddOutlined />} /> : ''}
                <p>{confirmLoading ? modalText : ''}</p>
            </Modal>
        </div>
    )
}

export default ModalForEdit;