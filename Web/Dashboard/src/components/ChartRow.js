import React from 'react';


function ChartRow(props) {
    return (
        <tr>
            <td >{props.id}</td>
            <td className='text-break'>{props.name}</td>
            <td className='text-break'>{props.description}</td>
            <td className='text-break'>{props.created}</td>
            <td className="d-flex">
            <a className="btn btn-primary" target={props.detail} href={props.detail} rel='follow' >👁</a>
            <a className="btn btn-primary" >❌</a>
            <a className="btn btn-primary" target={'http://localhost:3030/products/edit/' + props.id} href={'http://localhost:3030/products/edit/' + props.id} rel='follow' >✎</a>
            </td>
        </tr>
    )
}



export default ChartRow;