export async function postRequest(endpoint, data) {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;

    const response = await fetch(`http://localhost:3000/${cleanEndpoint}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorMessage = await response.text();
        console.log('Sunucu Hatası:', errorMessage);
        return { error: errorMessage };
    }

    return await response.json();
}

export async function patchRequest(endpoint, data) {
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
    try {
        console.log(cleanEndpoint);
        const response = await fetch(`http://localhost:3000/${cleanEndpoint}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            console.log('Sunucu Hatası:', errorMessage);
            return { error: errorMessage };
        }

        return await response.json();
    } catch (error) {
        console.error('Patch isteği başarısız:', error);
        return { error: 'Ağ hatası veya sunucuya ulaşılamadı.' };
    }
}
