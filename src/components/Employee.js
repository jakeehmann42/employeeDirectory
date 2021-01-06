function Employee(props) {
    return (
        
        <tr className="table-active">
            <th scope="row">{props.name}</th>
            <td>{props.email}</td>
            <td>{props.phone}</td>
            <td><img style={{borderRadius: '20px'}} alt={props.name} src={props.picture}></img></td>
        </tr>
    )

}

export default Employee;