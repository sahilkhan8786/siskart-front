import axios from 'axios'
export const fetchData = async (url) => {
    try {
        const data = await axios.get(url); // Destructure the data from response
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return []; // Return empty array on error
    }
};

export const registerUser = async (url, data) => {
    try {
        const result = await axios.post(url, data);

        const token = result?.data?.data?.token;

        if (token) {
            localStorage.setItem('authToken', token);
        }
        return token;

    } catch (error) {
        console.error('Error fetching data:', error?.response?.data?.message);
        return error?.response;
    }
};
export const loginUser = async (url, data) => {
    try {
        const result = await axios.post(url, data);

        const token = result?.data?.data?.token;

        if (token) {
            localStorage.setItem('authToken', token);
        }
        return token;

    } catch (error) {
        console.error('Error fetching data:', error?.response?.data?.message);
        return error?.response;
    }
};

export const protect = async (token) => {
    try {
        const response = await axios.get('auth/checkToken',
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        return response;

    } catch (error) {
        console.error('Error fetching data:', error?.response?.data?.message);
        return error?.response;
    }
}

// QUOTATIONS
export const reqQuotation = async (url, data) => {
    const token = localStorage.getItem('authToken')
    try {

        const response = await axios.post(url, data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;

    } catch (error) {
        console.error('Error fetching data:', error?.response?.data?.message);
        return error?.response;
    }
}
export const getQuotations = async (url) => {
    const token = localStorage.getItem('authToken')
    try {

        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;

    } catch (error) {
        console.error('Error fetching data:', error?.response?.data?.message);
        return error?.response;
    }
}
export const deleteQuotation = async (url) => {
    const token = localStorage.getItem('authToken')
    try {

        const response = await axios.delete(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;

    } catch (error) {
        console.error('Error Deleting Quotation:', error?.response?.data?.message);
        return error?.response;
    }
}

export const checkQuotation = async (url) => {
    const token = localStorage.getItem('authToken');

    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }

        })
        return response?.data?.data?.quotation;

    } catch (error) {
        console.error('Error Deleting Quotation:', error?.response?.data?.message);
        return error?.response;
    }
}


// USERS
export const getUser = async (url) => {
    const token = localStorage.getItem('authToken');
    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }

        })
        return response?.data?.data?.users;

    } catch (error) {
        console.error('Error Deleting Quotation:', error?.response?.data?.message);
        return error?.response;
    }
}

// BLOCK USER
export const blockUser = async (url, toBlock) => {
    const token = localStorage.getItem('authToken');
    try {
        const response = await axios.patch(url, {
            isBlocked: toBlock,
        },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
        return response?.data

    } catch (error) {
        console.error('Error Deleting Quotation:', error?.response?.data?.message);
        return error?.response;
    }
}

// DELETE USER
export const deleteUser = async (url) => {
    const token = localStorage.getItem('authToken');
    try {
        const response = await axios.delete(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        )
        return response?.data

    } catch (error) {
        console.error('Error Deleting Quotation:', error?.response?.data?.message);
        return error?.response;
    }
}

// APPROVE QUOTATION
export const approveQuotation = async (url) => {
    const token = localStorage.getItem('authToken');
    try {
        const response = await axios.get(url, {
            headers: {

                Authorization: `Bearer ${token}`,
                "Content-Type": 'application/pdf',
            },
            // responseType: 'blob'
        }
        )
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = 'siskart-quotation.pdf'; // The name of the downloaded file
        link.click();
        return response;

    } catch (error) {
        console.error('Error Creating Quotation:', error);
        console.log(error.response)
        return error?.response;
    }

}

// PRODUCT HEADERS
export const getProductHeader = async (url) => {
    try {
        const response = await axios.get(url)
        return response?.data?.data

    } catch (error) {
        console.error('Error Fetching Header:', error);
        return error?.response;
    }
}