export const DoCmd = async ({ cmd, data, token })=>{
    const commandUri = process.env.EXPO_PUBLIC_API_URL;
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
            },
        body: JSON.stringify({ cmd, data }),
    };
    try {
        const request = await fetch(commandUri, requestOptions);
        const response = await request.json();
        return response;
    } catch (error) {
        return { cmd, data:{ outData: null, msg: error.message, ok: false }}
    }
}