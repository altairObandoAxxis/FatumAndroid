const LoginEndpoint = 'https://sisos-eu.azurewebsites.net/api/pub/authenticate';
export const DoLogin = async ({ email, clave })=>{
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            },
        body: JSON.stringify({ email, clave }),
    };
    try {
        const request = await fetch(LoginEndpoint, requestOptions);
        const response = await request.json();
        return response;
    } catch (error) {
        console.log(error);
    }
}