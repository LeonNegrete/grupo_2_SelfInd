import React from 'react';


function ChartRow(props) {
    return (
        <tr>
            <td>{props.id}</td>
            <td>{props.name}</td>
            <td>{props.description}</td>
            <td>{props.created}</td>
            <a className="btn btn-primary" target={props.detail} href={props.detail} rel='follow' >Ver detalle</a>
        </tr>
    )
}



export default ChartRow;