import React from 'react';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
function ChartRow(props) {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <tr>
                <td >{props.id}</td>
                <td className='text-break'>{props.name}</td>
                <td className='text-break'>{props.description}</td>
                <td className='text-break'>{props.created}</td>
                <td className="d-flex">
                    <a className="btn btn-primary" target={props.detail} href={props.detail} rel='follow' >👁</a>
                    <button className="btn btn-primary" onClick={() => setShowModal(true)}>❌</button>
                    <a className="btn btn-primary" target={'http://localhost:3030/products/edit/' + props.id} href={'http://localhost:3030/products/edit/' + props.id} rel='follow' >✎</a>
                </td>
            </tr>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Eliminar producto</Modal.Title>
                </Modal.Header>
                <Modal.Body>¿Esta seguro que quiere eliminar el producto {props.name}, de id {props.id}?</Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                    <form action={"http://localhost:3030/api/products/" + props.id + "/delete"} method="post">
                                <button type="submit" class="btn btn-danger">Borrar</button>
                    </form>
                </Modal.Footer>
            </Modal>
        </>
    )
}



export default ChartRow;