import './App.css';

import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useState } from 'react';
import Comment from './components/Comment';
import Loader from './components/Loader';

function App() {

  const [items, setItems] = useState([]);

  const [hasMore, setHasMore] = useState(true);

  const [page, setPage] = useState(2);

  const getComments = async()=>{
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/comments?_page=1&_limit=20`
        );
      const data =await res.json();
      setItems(data);
      
  }

  useEffect(()=>{
    getComments();
  },[]);

  console.log(items);

  const nextGetComments = async() =>{
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/comments?_page=${page}&_limit=20`
    );
    const nextData = await res.json();
    return nextData;
  }

  const fetchData= async ()=>{
    const commentsFromServer = await nextGetComments();

    setItems([...items, ...commentsFromServer]);
    if(commentsFromServer.length === 0 || commentsFromServer.length < 20) {
      setHasMore(false);
    }
    setPage(page+1);
    
  }

  return (
      <InfiniteScroll
        dataLength={items.length} 
        next={fetchData}
        hasMore={hasMore}
        loader={<Loader/>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
        
      >
        <div className='container'>
          <div className='row m-2'>
              {items.map((data)=>(
              <Comment key={data.id} data={data}/>
              ))}
          </div>
        </div>

      </InfiniteScroll>
  );
}

export default App;
