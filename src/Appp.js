
import { useEffect,useState } from "react";
const Appp=()=>{
     const [state,SetState]=useState([])
     const[loader,SetLoader]=useState(false);
     const[error,SetError]=useState(false);
     const [can,SetCan]=useState(false);


     

   async function FetchMovieHandler(){
    SetLoader(true);
    SetError(null);
    
   
    try{
      
         let response=await fetch('https://swapi.dev/api/film/');

   
             if(!response.ok){
            
           let timer =setInterval(()=>{
            
                fetch('https://swapi.dev/api/film/')

            },[5000])

            return ()=>{clearInterval(timer)}

          
        
       }   

         



    
 
        const data=await response.json();
     
            const movies=data.results.map((movieData)=>{return {
                id:movieData.episode_id,
                title:movieData.title,
                openingtext:movieData.opening_crawl,
                releaseDate:movieData.release_date,

            }
           
        });
         SetState(movies);
        
      
        
    }catch(error){
        SetError(error.message);

    }
       SetLoader(false)
       
       
    }
   
 

    return(<>

    <header><button  onClick={FetchMovieHandler}>fetch movies</button></header>

     <main>  <li><span>movieId </span> <span> MovieTitle </span> <span> MovieReleaseDate </span></li>

     {loader && <> <p style={{color:"Green"}}>Please Wait....⏳⏳⏳⏳</p>,<button onClick={()=>console.log("clicked")}>cancel</button></> }
     
     {!loader && state.map((movie)=>{return <ul> <li>{movie.id} {movie.title} {movie.releaseDate}</li> </ul>})}</main>
            {!loader && error &&<>  <p>{error}</p> </>}


    </>)

}
export default Appp;
