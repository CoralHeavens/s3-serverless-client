const API_BASE = 'https://k096r6u3cj.execute-api.us-east-1.amazonaws.com/dev/'
const API_KEYS = {
    getImage: `${API_BASE}get-image`,
    postImage: `${API_BASE}post-image`,
}

export default class S3Service {
    #doRequest = (func) => func
            .then((res) => res.json())
            .catch((err) => console.error(err.message));

    getImage = (id) => 
        this.#doRequest(
            fetch(`${API_KEYS.getImage}/${id}`, {method: 'GET'})
        )

    postImage = (file) => 
        this.#doRequest(
            fetch(API_KEYS.postImage, {
                method: 'POST',
                body: JSON.stringify({
                    data: file
                }),
                mode: 'no-cors'
            })
        )
}