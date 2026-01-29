
export async function postRequest(endpoint, data) {
    const response = await fetch(`https://reqres.in/api${endpoint}`, {
        method: 'POST',
        headers: { 
               'Content-Type': 'application/json',
               "x-api-key": "reqres_3f0a3d7e55b046a8a9c10a832a90ab95"
         },
        body: JSON.stringify(data)
    });

    return await response.json();
}
