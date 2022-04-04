import { useState } from "react"
import './singlePaintingComponent.css'

const SinglePaintingComponent = (props)=>{
    const [isShowing , setIsShowing]=useState(false)
    const [ previewSorce , setPreviewSorce]=useState()
    const toggleIsShowing =()=>{
        setIsShowing(!isShowing)
    }
    const [updatePainting, setUpdatePainting]=useState({
        paintingTitle : props.painting.paintingTitle,
        artistName : props.painting.artistName,
        image : props.painting.image,
        paintingHeight : props.painting.paintingHeight,
        paintingWidth : props.painting.paintingWidth
    })
    const handleInputChange = (e)=>{
        e.preventDefault()
        setUpdatePainting({
            ...updatePainting,
            [e.target.name]: e.target.value
        })
    }
    const submitUpdate = (e)=>{
        e.preventDefault()
        props.updatePainting(props.painting._id, updatePainting)
        setIsShowing(false)
    }
    const handleFileInputChange = (e) =>{
        e.preventDefault()
        const file = e.target.files[0]
        props.setImage(file)
        perviewFile(file)
    }
    const perviewFile = (file)=>{
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = ()=>{
            setPreviewSorce(reader.result)
        }
    }
    return(
        <div className="main-div">
            <div className="single-item-div">
                <h2>Artist : {props.painting.artistName}</h2>
                <img className="img" src={props.painting.image} alt="img"/>            
                <h2>Painting Title : {props.painting.paintingTitle}</h2>
                <h2>Height : {props.painting.paintingHeight}</h2>
                <h2>Width : {props.painting.paintingWidth}</h2> 
            </div>

            <button onClick={()=>props.deletePainting(props.painting._id)}>Delete</button>

            {isShowing ? 
            <div>
                <form onSubmit={submitUpdate}>
                Painting Title : <input onChange={handleInputChange} type="text" name="paintingTitle" value={updatePainting.paintingTitle}/><br/>
                Artist Name : <input onChange={handleInputChange} type="text" name="artistName" value={updatePainting.artistName}/><br/>
                Upload a photo: <input onChange={handleFileInputChange} type="file" id="image" name="image" ></input><br/>
                painting Height: <input onChange={handleInputChange} type="Number" name="paintingHeight" value={updatePainting.paintingHeight}/><br/>
                painting Width: <input onChange={handleInputChange} type="Number" name="paintingWidth" value={updatePainting.paintingWidth}/><br/>
                <button type="submit">submit</button>
                <button onClick={toggleIsShowing}>Cancel</button>
            </form>
            </div>
            :
            <button onClick={toggleIsShowing}>Edit</button>
            }
        </div>

    )
}
export default SinglePaintingComponent