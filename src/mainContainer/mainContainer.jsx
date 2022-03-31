import {useEffect, useState} from 'react'
import SinglePaintingComponent from './singlePaintingComponent/singlePaintingComponent'
import NewPaintingCOmponent from './newPaintingComponent/newPaintingComponent'


const MainContainer = ()=>{
    const [paintings , setPaintings]= useState([])
    const [imageIds, setImageIds] = useState();
    const [image, setImage ] = useState("");
    const [ url, setUrl ] = useState("");
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
    const deletePainting = async (paintingId) =>{
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
    useEffect(() => getPaintings, [])

    return(
        <div className="main-container">
            <NewPaintingCOmponent createNewPainting={createNewPainting} setImage={setImage}/>
            {paintings.map((item)=>{
                return <SinglePaintingComponent key={item._id} painting={item} deletePainting={deletePainting}/>
            })}
        </div>
    )
}
export default MainContainer