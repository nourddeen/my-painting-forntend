
const SinglePaintingComponent = (props)=>{
    return(
        <div>
            <h2>Artist : {props.painting.artistName}</h2>
            <h2>Painting Title : {props.painting.paintingTitle}</h2>
            <img src={props.painting.image} />
            <h2>Height : {props.painting.paintingHeight}</h2>
            <h2>Width : {props.painting.paintingWidth}</h2>
            <button onClick={()=>props.deletePainting(props.painting._id)}>Delete</button>
        </div>

    )
}
export default SinglePaintingComponent