export const loadPosts = async () => {

    //json placeholder api usando fetch() builtin do navegador
    const posts_response = fetch('https://jsonplaceholder.typicode.com/posts');
    const photos_response = fetch('https://jsonplaceholder.typicode.com/photos');

    const [posts, photos] = await Promise.all([posts_response, photos_response]);

    const posts_json = await posts.json();
    const photos_json = await photos.json();

    const post_zipped_photos = posts_json.map((post, index) => {
        return {...post, cover:photos_json[index].url}
    })
    return post_zipped_photos;
}