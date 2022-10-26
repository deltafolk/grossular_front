function Edit(props) {
    console.log(props.data)
    return (
        <div>
        <div> {props.data.off} </div>
        <div> {props.data.act} </div>
        <div> {props.data.year} </div>
        <div> {props.data.amount} </div>
        <div> {props.data.note} </div>
        </div>
    )
}

export default Edit;