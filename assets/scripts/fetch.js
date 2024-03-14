export const fetchOrder = async (token, page = 1, limit = 10) => {
    try {
        const r = await fetch(
            `https://amamy.net/wp-json/custom/v1/don_hang?page=${page}&per_page=${limit}`,
            {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }
        );
        const res = await r.json();
        return res;
    } catch (error) {
        throw error;
    }
};

export const fetchUserInfor = async (token) => {
    try {
        const r = await fetch('https://amamy.net/wp-json/custom/v1/info', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
        const res = await r.json();
        return res;
    } catch (error) {
        throw error;
    }
};

export const editUserInfor = async (token, formData) => {
    try {
        const r = await fetch('https://amamy.net/wp-json/custom/v1/edit_info', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token
            },
            body: formData
        });
        const res = await r.json();
        return res;
    } catch (error) {
        throw error;
    }
};

export const fetchAvatar = async (token) => {
    try {
        const r = await fetch('https://amamy.net/wp-json/custom/v1/avatar', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        });
        const res = await r.json();
        return res;
    } catch (error) {
        throw error;
    }
};

export const editAvatar = async (token, formData) => {
    try {
        const r = await fetch('https://amamy.net/wp-json/custom/v1/avatar', {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + token
            },
            body: formData
        });
        const res = await r.json();
        return res;
    } catch (error) {
        throw error;
    }
};
