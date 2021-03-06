import axios from 'axios'
import React, { Component } from 'react'
import '../styles/Albums.css'




 class Albums extends Component {
    constructor(props){
        super(props)

        this.state = {
            albums: [],
            input: "",
            showForm: false,
            oneClicked: false, 
            find:"",
            showFind: false
        }
    }

    componentDidMount() {
        this.getAlbums()
    }

    getAlbums = () => {
        fetch('https://jsonplaceholder.typicode.com/albums')
        .then(response => response.json())
        .then(json => {
            //console.log(json)
            return this.setState({albums: json})
        })
    }

    showAddAlbum = () => {
        this.setState({showForm : !this.state.showForm, input: ""})
    }

    cancelAddAlbum = () => {
        this.setState({showForm : !this.state.showForm, input: ""})
    }
    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
        
    }
    approveAddAlbum = (e) => {
        if(this.state.input !== ""){
            axios.post('https://jsonplaceholder.typicode.com/albums', {title:this.state.input})
            .then(res => {
                console.log(res.data)
                this.setState({albums: [...this.state.albums, res.data], input: ""});

                e.target.nextElementSibling.style.display = "inline-block";
                e.target.previousElementSibling.previousElementSibling.style.display = "none"
                setTimeout(()=>{
                    e.target.nextElementSibling.style.display = "none";
                },2000)
            })
        } else {
            e.target.previousElementSibling.previousElementSibling.style.display = "inline-block"
        }
        
    }

    showButtons = (e)=> {
        if(!this.state.oneClicked){
            e.target.previousElementSibling.style.display = "block";
            this.setState({oneClicked: !this.state.oneClicked});
            
            //console.log(e)
        }
    }

    editFunc = (e) => {

        e.target.parentElement.style.display = "none"
        e.target.parentElement.nextElementSibling.nextElementSibling.style.display = "block";
        e.target.parentElement.nextElementSibling.contentEditable = true;
        e.target.parentElement.nextElementSibling.classList.add("highlightInputs")
        //console.log(e)
    }
    deleteAlbum = (e) => {
        const data = {
            method: 'DELETE',
        }
        
        fetch('https://jsonplaceholder.typicode.com/albums/' + e.target.parentElement.parentElement.id, data)
        .then(response => response.json())
        .then(jsonResponse => {
            console.log(jsonResponse);
            e.target.parentElement.parentElement.remove();
        })
        

        this.setState({oneClicked: !this.state.oneClicked});
    }

    saveChanges = (e) => {
        
        const updateInputValue = e.target.parentElement.previousElementSibling.innerHTML
        const parentID = parseInt(e.target.parentElement.parentElement.id);
       
        axios.put("https://jsonplaceholder.typicode.com/albums/" + parentID, { title: updateInputValue})
        .then( res => console.log(res.data) )
        .then(()=>{
            
            this.setState({...this.state, albums: this.state.albums.filter(item => {
                return item.id === parentID ? item.title = updateInputValue : item
            })});
           
        })
        .catch(err=>{console.log(err)});

        e.target.parentElement.previousElementSibling.contentEditable = false;
        e.target.parentElement.previousElementSibling.classList.remove("highlightInputs");
        e.target.parentElement.style.display = "none";
        this.setState({oneClicked: !this.state.oneClicked});
    }
    cancelChanges = (e) => {
        
        e.target.parentElement.previousElementSibling.innerHTML = this.state.albums[e.target.id].title; 
        e.target.parentElement.previousElementSibling.contentEditable = false;
        e.target.parentElement.previousElementSibling.classList.remove("highlightInputs");
        e.target.parentElement.style.display = "none";
        this.setState({oneClicked: !this.state.oneClicked});
    }


    render() {
        const filteredData =this.state.albums.filter(
            item=>{
              return item.title.toLowerCase().indexOf(this.state.find.toLowerCase()) !== -1
        })
        return (
            <div>
             <h1 id="albumHeader">Albums List</h1>
             <div id="findAndAddBtn">
                    <button id="addButtonAlbums" onClick={this.showAddAlbum}>Add</button>
                    <button id="findButtonAlbums" onClick={()=>this.setState({showFind: !this.state.showFind})}>Find</button>
             </div>
             {this.state.showFind ? 
             <input placeholder="Find an Album by title!" id="findPostInput" name="find" onChange={this.handleChange} value={this.state.find}/> : ""}
             
             {this.state.showForm ? 
             <div className="addAlbumDiv">
                <input name="input" id="albumInput" value={this.state.input} onChange={this.handleChange} placeholder="Enter your item!"></input>
                <span id="albumRequire">*required</span>

                <i className="fas fa-window-close cancelAlbumAdd" onClick={this.cancelAddAlbum}></i>
                <i className="fas fa-check-square approveAlbumAdd" onClick={this.approveAddAlbum}></i>

                <span id="albumSuccesful">Succesfully added!</span>
             </div> : ""}
             
             <div className='album-container'>
             {filteredData.map((item,index) => {
                 return (
                    <div className='container' key={index} id={item.id}>
                        <div className="albumBothButtons">
                            <span className="editAlbumBtn" onClick={this.editFunc}>Edit </span>|
                            <span className="deleteAlbumBtn" onClick={this.deleteAlbum}> Delete</span>
                        </div>
                        
                        <span className="albumItem" onClick={this.showButtons} contentEditable={false}>{item.title}</span>
                        <div className="secondAlbumButtons">
                            <button className="saveAlbumChanges" onClick={this.saveChanges}>Save</button>
                            <button className="cancelAlbumChanges" onClick={this.cancelChanges} id={index}>Cancel</button>
                        </div>
                    </div>
                 ) 
             })}
             </div>
            

            </div>
        )
         
    }
}
export default Albums;





// <table>
// <tbody>
// <tr>
//     {/* <th>UserID</th> */}
//     <th>USER-ID</th>
//     <th>ID</th>
//     <th>TITLE</th>
// </tr>

// {this.state.albums.map((album) => {
//     return (
        
//         <tr key={album.id}>

//         {/* <td >{post.userId}</td> */}
//         <td >{album.userId}</td>
//         <td >{album.id}</td>
//         <td >{album.title}</td>

//     </tr>
    
   
//     )
// })}
// </tbody>
 

// </table>