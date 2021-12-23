import React,{Component,useState, useEffect} from "react";

function NewsFetch() {
    const [news, setNews]=useState([])
    const [searchQuery, setSearchQuery]=useState('react')
    const [url, setURL] =useState(`https://hn.algolia.com/api/v1/search?query=${searchQuery}`)
    //at first page wouldn't load so let's keep it false
   const [loading, setLoading] = useState(false)


   const fetchNews= ()=>{

    // set loading true after fetching
    setLoading(true)
        fetch(url)
        .then((result)=>result.json())
        .then((data)=>(setNews(data.hits),setLoading(false)))
        .catch((err)=>console.log(err))
   }

        useEffect(()=>{
        fetchNews()
        },[url])

   const changeHandle = (e)=>{
    setSearchQuery(e.target.value)
   }

   const submitHandle=(e)=>{
        //to avoid reloading
        e.preventDefault()
        setURL(`https://hn.algolia.com/api/v1/search?query=${searchQuery}`)
   }

   const showLoading=()=>(loading?<h1>Loading...</h1>: "");

   const searchForm=()=>(
    <form onSubmit={submitHandle}>
    <input type="text" value={searchQuery} onChange={changeHandle} />
    <button>Search</button>
</form>
   );

   const showNews=()=>(
    news.map((value,i)=>(<p key={i}>{value.title}</p>))
   );


    return (
        <div>
            <h1>NEWS</h1>
            {showLoading()}
            {searchForm()}
            {showNews()}
        </div>
    )
}

export default NewsFetch;
