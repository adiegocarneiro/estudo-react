import { Component } from 'react'
import { loadPosts } from '../../utils/loadPosts'
import { Posts } from "../../Components/Posts"
import { Button } from '../../Components/Button';

import "./estilo.css"
import { TextInput } from '../../Components/TextInput';

class Home extends Component{
    
    state = {
        posts:[],
        allPosts:[],
        page:0,
        postsPerPage:10,
        searchValue:""
    };


    loadPosts = async () => {
        const { page, postsPerPage } = this.state
        const posts_zipped_photos = await loadPosts()
        this.setState({
            posts:posts_zipped_photos.slice(page,postsPerPage),
            allPosts:posts_zipped_photos,
        })
    }

    loadMorePosts = () => {
        const {
            page,
            postsPerPage,
            allPosts,
            posts
        } = this.state
        const nextPage = page + postsPerPage
        const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)

        posts.push(...nextPosts)//spread operator -> cada elemento de um array vira um parametro

        this.setState({posts, page:nextPage})


    }

    handleChange = (e)=>{
        const  {value} = e.target;
        this.setState({searchValue:value})
    }

    //lifecycle methods
    async componentDidMount() {
        //quando o componente for montado na tela do browser - bom pra puxar dados de api, bancos, etc
        await this.loadPosts();
            
    }    

    componentDidUpdate(){
        //acontece quando o estado da aplicação é atualizado, antes do render
        
    }
    
    componentWillUnmount(){
        //acontece quando o componente vai ser desmontado da página - bom pra limpar lixo

    }

    render(){
        const {posts, page, postsPerPage, allPosts, searchValue} = this.state;
        const noMorePosts = page + postsPerPage >= allPosts.length

        const filteredPosts = !!searchValue ? allPosts.filter(post => {
            return post.title.toLowerCase().includes(searchValue.toLowerCase())
        })
        : posts;


        return(
            <section className="container">
                <div className="search-container">
                {//se searchValue true - mostrar search
                    !!searchValue && 
                    (
                            <h1>Search value:{searchValue}</h1>
                    )
                }
                    <TextInput 
                        searchVale = {searchValue}
                        handleChange = {this.handleChange}
                    />
                </div>
                
                
                {
                    filteredPosts.length > 0 && (
                        <Posts posts={filteredPosts}/>
                    )
                }

                {
                    filteredPosts.length === 0 && (
                        <p>Nenhum post contém "{searchValue}"</p>
                    )
                }


                <div  className="button-container">
                    {   //se searchValue false - esconder botao 
                        !searchValue && 
                        (
                            <Button 
                                disabled={noMorePosts}
                                label="Load more posts"
                                onClick = { this.loadMorePosts }
                            />
                        )
                    }
                </div>
            </section>
        );
    }

}

export default Home;