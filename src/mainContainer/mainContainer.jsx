import {useEffect, useState} from 'react'
import {Link, Route, Routes } from "react-router-dom";
import SinglePaintingComponent from './singlePaintingComponent/singlePaintingComponent'
import NewPaintingComponent from './newPaintingComponent/newPaintingComponent'
import "./mainContainer.css"


const MainContainer = ()=>{
    const [paintings , setPaintings]= useState([])
    const [image, setImage ] = useState("");
    const getPaintings = async () =>{
        try{
            const getPaintingsResponse = await fetch('https://mypainting-backend.herokuapp.com/')
            const parsedPaintingsResponse = await getPaintingsResponse.json()
            console.log(parsedPaintingsResponse)
            setPaintings(parsedPaintingsResponse.data)
        }catch(err){
            console.log(err)
        }
    }

    const createNewPainting = async (newPainting) =>{
        try {
            const data = new FormData()
            data.append("file", image)
            data.append("upload_preset", "nourddeen")

            const uploadImage = await fetch("https://api.cloudinary.com/v1_1/nourddeen-test/image/upload",{
                method:"POST",
                body: data
            })
            const paresedImageResponse = await uploadImage.json()
            newPainting.image = await paresedImageResponse.url
            console.log("new painting\n", newPainting)
            const createApiResponse = await fetch("https://mypainting-backend.herokuapp.com",{
            method : "POST",
            body : JSON.stringify(newPainting),
            headers: {
                "Content-Type": "application/json"
            }
        })
        console.log(createApiResponse)
        const parsedCreateApi = await createApiResponse.json()
        console.log('here')
        console.log(parsedCreateApi)
        if(parsedCreateApi.success){
            setPaintings([parsedCreateApi.data , ...paintings])
        }else{
            console.log('cloudnt create')
        }
        } catch (err) {
            console.log(err)
        }
    }
    const deletePainting = async (paintingId ) =>{
        console.log()
        try{
            const deleteResponse = await fetch(`https://mypainting-backend.herokuapp.com/${paintingId}`,{
                method: "DELETE"
            })
            const parsedDeleteResponse = await deleteResponse.json()
            console.log(parsedDeleteResponse)
            if(parsedDeleteResponse.success){
                const newPainting = paintings.filter(item => item._id !== paintingId)
                setPaintings(newPainting)
            }else{
                console.log('couldnt delete')
            }
        }catch(err){
            console.log(err)
        }
        
    }
    const updatePainting = async (newPaintingId , paintingToUpdate) =>{
        try {
            const data = new FormData()
            data.append("file", image)
            data.append("upload_preset", "nourddeen")

            const updateImage = await fetch(`https://api.cloudinary.com/v1_1/nourddeen-test/image/upload`,{
                method:"PUT",
                body: data
            })
            const paresedImageResponse = await updateImage.json()
            paintingToUpdate.image = await paresedImageResponse.url
            console.log("updated painting\n", paintingToUpdate)
            const createApiResponse = await fetch(`https://mypainting-backend.herokuapp.com/${newPaintingId}`,{
            method : "PUT",
            body : JSON.stringify(paintingToUpdate),
            headers: {
                "Content-Type": "application/json"
            }
        })
        console.log(createApiResponse)
        const parsedCreateApi = await createApiResponse.json()
        console.log('here')
        console.log(parsedCreateApi)
        if(parsedCreateApi.success){
            const updatedPainting = paintings.map(paniting => paniting._id === newPaintingId ? paintingToUpdate : paniting)
            setPaintings(updatedPainting)
        }else{
            console.log('cloudnt create')
        }
        } catch (err) {
            console.log(err)
        }
    }
    
    useEffect(()=>{getPaintings()}, [])

    return(
        <div >
        <nav className="nav">
        <div className="nav-brand">
          <h1>My Painting</h1>
        </div>
        <ul className="nav-items">
          <li ><Link className='list' to="/"><h1>Gallery</h1></Link></li>
          <li ><Link className='list' to="/upload"><h1>Upload</h1></Link></li>
        </ul>
      </nav>
      <div className="main-container">
         <Routes>
        <Route element={<NewPaintingComponent createNewPainting={createNewPainting} setImage={setImage}/>} path="/upload" />
        <Route element={paintings.map((item)=>{
                return <div className='maybe'><SinglePaintingComponent key={item._id} painting={item} deletePainting={deletePainting} updatePainting={updatePainting} setImage={setImage}/></div>
            })} path="/" />
        </Routes> 
        </div>
      
        </div>
    )
}
export default MainContainer