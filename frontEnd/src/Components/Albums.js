import React, { Component } from 'react'
import '../styles/Albums.css'
// import AlbumForm from "./AlbumForm"



 class Albums extends Component {
    constructor(props){
        super(props)

        this.state = {
            albums: [],
            showForm: false
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
  }
    )
    }

    render() {
        
        return (
            <div>
             <h2>Albums List</h2>
             <button>Add</button>
             <div className='album-container'>
             {this.state.albums.map((item,index) => {
                 return <a href="https://www.youtube.com/watch?v=UXiAyIZjk7c" target="_blank" rel="noreferrer" className='container' key={index}>
                     {item.title}
                 </a>
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