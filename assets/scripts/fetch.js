// HAVE TOKEN
const prefix = 'https://amamy.okhub-tech.com';
export const changePassword = async (token, formData) => {
    try {
        const r = await fetch(prefix + '/wp-json/custom/v1/update_password', {
            method: 'POST',
            body: formData,
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

export const fetchOrder = async (token, page = 1, limit = 10) => {
    try {
        const r = await fetch(
            prefix +
                `/wp-json/custom/v1/don_hang?page=${page}&per_page=${limit}`,
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
        const r = await fetch(prefix + '/wp-json/custom/v1/info', {
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
        const r = await fetch(prefix + '/wp-json/custom/v1/edit_info', {
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
        const r = await fetch(prefix + '/wp-json/custom/v1/avatar', {
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
        const r = await fetch(prefix + '/wp-json/custom/v1/avatar', {
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

export const fetchWeight = async (token) => {
    try {
        const r = await fetch(prefix + '/wp-json/custom/v1/rank_can', {
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

// NO TOKEN

export const fetchRanks = async () => {
    try {
        const r = await fetch(prefix + '/wp-json/custom/v1/rank');
        const res = await r.json();
        return res;
    } catch (error) {
        throw error;
    }
};

// forgot password begin
export const requestResetPassword = async (formData) => {
    try {
        const r = await fetch(prefix + '/wp-json/bdpwr/v1/reset-password', {
            method: 'POST',
            body: formData
        });
        const res = await r.json();
        return res;
    } catch (error) {
        throw error;
    }
};

export const validateResetCode = async (formData) => {
    try {
        const r = await fetch(prefix + '/wp-json/bdpwr/v1/validate-code', {
            method: 'POST',
            body: formData
        });
        const res = await r.json();
        return res;
    } catch (error) {
        throw error;
    }
};

export const setPassword = async (formData) => {
    try {
        const r = await fetch(prefix + '/wp-json/bdpwr/v1/set-password', {
            method: 'POST',
            body: formData
        });
        const res = await r.json();
        return res;
    } catch (error) {
        throw error;
    }
};

// forgot password end

export const login = async (formData) => {
    try {
        const r = await fetch(prefix + '/wp-json/jwt-auth/v1/token', {
            method: 'POST',
            body: formData
        });
        const res = await r.json();
        return res;
    } catch (error) {
        throw error;
    }
};

export const register = async (formData) => {
    try {
        const r = await fetch(prefix + '/wp-json/custom/v1/register', {
            method: 'POST',
            body: formData
        });
        const res = await r.json();
        return res;
    } catch (error) {
        throw error;
    }
};
