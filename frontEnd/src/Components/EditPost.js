import axios from 'axios';
import {useEffect, useReducer} from 'react'
import {Link, useParams} from 'react-router-dom';
import "../styles/EditPost.css"

let initialState={postForEdit:{}, titleEdit: "", bodyEdit: ""}

const reducer = (state, action) => {
    switch(action.type){
        case "postForEdit" : return {...state, postForEdit: action.payload};
        case "titleEditPostInput" : return {...state, titleEdit: action.payload} ;
        case "bodyEditPostInput" : return {...state, bodyEdit: action.payload} ;
        default: 
            return state;
    }
}

export default function EditPost(props) {

    const [state, dispatch] = useReducer(reducer, initialState)

    let { id } = useParams();
    
    // console.log(path, url)
    //console.log(id)


    useEffect(() => {
        fetch("http://localhost:8080/api/posts/" + id)
            .then(res => res.json())
            .then(jsonResponse => {
                dispatch({type: "postForEdit", payload: jsonResponse})
            })
        //console.log(state)
    }, [])
   
    const cancelPostEdit = () => {
        
    }
    const editPostFunc = () => {

        let item={};

        if(state.titleEdit !== "" || state.bodyEdit !== ""){
            item = {title: state.titleEdit, body: state.bodyEdit}
        }

        
        if(item.title === ""){delete item.title};
        if(item.body === ""){delete item.body}

        if(item.title || item.body){

            axios.put("http://localhost:8080/api/posts/" + id, item )
                .then((res)=>{
                console.log(res.data)
            })
            .catch(err=> {console.log(err)})

        }
        
        
    }

    const handleChange = (e) => {
        dispatch({type: e.target.id, payload: e.target.value})
    }
    
    return (
        <div>
            <h2 id="editPostHeader">Edit Post - {id}</h2>
            <div className="editPostContainer">
                <label htmlFor="title">Title</label><br />
                <input onChange={handleChange} placeholder="Enter your title!" id="titleEditPostInput" defaultValue={state.postForEdit.title}/> <br />
                <label htmlFor="body">Body</label><br />
                <input onChange={handleChange} placeholder="Enter your post!" id="bodyEditPostInput" defaultValue={state.postForEdit.body}/> <br />
                <Link to="/Posts" id="cancelLink"><button onClick={cancelPostEdit} id="cancelEditPost">Back</button></Link>
                <Link to="/Posts" id="saveLink"><button onClick={editPostFunc} id="saveEditPost">Save Changes</button></Link>
            </div>
        </div>
    )
}
