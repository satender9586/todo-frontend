


interface autUserDetailsInterface {
    userName: string,
    _id: string
}

export const SaveTokenInCookies = (token: string) => {
    const incomingToken: string = token
    const expirationTime: number = 1;
    const expires: Date = new Date();
    expires.setTime(expires.getTime() + expirationTime * 60 * 60 * 1000);
    document.cookie = `accessToken=${incomingToken}; expires=${expires.toUTCString()};`
}

export const SaveAuthDetails = (data: autUserDetailsInterface) => {
    try {
        const incomingUser: autUserDetailsInterface = {
            userName: data.userName,
            _id: data._id
        };
        const serializedUser = JSON.stringify(incomingUser);
        const expirationTime: number = 1;
        const expires: Date = new Date();
        expires.setTime(expires.getTime() + expirationTime * 60 * 60 * 1000);
        document.cookie = `userDetails=${encodeURIComponent(serializedUser)}; expires=${expires.toUTCString()}; path=/; Secure; SameSite=Strict`;
    } catch (error) {
        console.error('Error saving authentication details:', error);
    }
};

export const getToken = (): string | null => {
    
    const token = document.cookie
        .split('; ')
        .find(cookie => cookie.startsWith('accessToken='))?.split('=')[1];

    return token || null; 
};

export const getUserCookies = (): string | null => {
    const user = document.cookie.split('; ').find(cookie => cookie.startsWith('userDetails'))?.split('=')[1];
    return user || null; 
};

function deleteCookie(name:string) {
    document.cookie = name + '=; Max-Age=0; path=/';
}


export function deleteAllCookies() {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].split('=');
        const cookieName = cookie[0].trim();
        deleteCookie(cookieName);
    }
}

