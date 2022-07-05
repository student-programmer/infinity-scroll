import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { data } from '../data';
import PostItem from './PostItem';


const LIMIT = 7;

const PostList = () => {
    const [postData, setPostData] = useState(data.slice(0, LIMIT));
    const [visible, setVisible] = useState(LIMIT);
    const [hasMore, setHasMore] = useState(true);

    const fetchData = () => {
        const newLimit = visible + LIMIT;
        const dataToAdd = data.slice(visible, newLimit);

        if (data.length > postData.length) {
            setTimeout(() => {
                setPostData([...postData].concat(dataToAdd));
            }, 1000);
            setVisible(newLimit);
        } else {
            setHasMore(false);
        }
    };
    return (
        <div>
            <InfiniteScroll
                dataLength={postData.length} //This is important field to render the next data
                next={fetchData}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}

            >
                {postData.map(item =>{
                    return <PostItem key={item.id} title={item.title}/>
                })}
            </InfiniteScroll>
        </div>
    );
};

export default PostList;
