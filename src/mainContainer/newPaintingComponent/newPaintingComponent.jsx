import { useState } from "react"
import './newPainting.css'

const NewPaintingComponent = (props) =>{
    const [ previewSorce , setPreviewSorce]=useState()
    const [newPainting, setNewPainting] = useState({
        paintingTitle: "",
        artistName: "",
        image: "",
        paintingHeight: "",
        paintingWidth: ""
    })
    const handleInputChange =(e)=>{
        setNewPainting({
            ...newPainting,
            [e.target.name]: e.target.value,
        })
    }
    const submitNewPainting = (e)=>{
        e.preventDefault()
        props.createNewPainting(newPainting)
        setNewPainting({
            paintingTitle: "",
            artistName: "",
            image: "",
            paintingHeight: "",
            paintingWidth: ""
        })
        setPreviewSorce()
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
        <div className="new-painting-component">
            <form onSubmit={submitNewPainting}>
                Painting Title : <input required minLength={3} onChange={handleInputChange} type="text" name="paintingTitle" value={newPainting.paintingTitle}/><br/>
                Artist Name : <input required minLength={3} onChange={handleInputChange} type="text" name="artistName" value={newPainting.artistName}/><br/>
                Upload a photo: <input required onChange={handleFileInputChange} type="file" id="image" name="image" value={newPainting.image}></input><br/>
                painting Height in cm: <input onChange={handleInputChange} type="Number" name="paintingHeight" value={newPainting.paintingHeight}/><br/>
                painting Width in cm: <input onChange={handleInputChange} type="Number" name="paintingWidth" value={newPainting.paintingWidth}/><br/>
                <button type="submit">submit</button>
            </form>
            {previewSorce ?
            <img src={previewSorce} alt="image" className="preview-image"/>
            :
            null
            }
        </div>
    )
}
export default NewPaintingComponent