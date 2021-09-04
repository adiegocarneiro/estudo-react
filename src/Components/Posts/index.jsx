import { PostCard } from "../PostCard"
import "./estilo.css"

export const Posts = ({posts}) => (
    <div className="posts-area">
        {posts.map(post => (
            //sempre que tiver map eu preciso informar key
            <PostCard 
                key = {post.id}
                title = {post.title}
                body = {post.body}
                cover = {post.cover}
            />
        ))}
    </div>
);