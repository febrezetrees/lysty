//used for RUD (of CRUD) - RUD determined by the optionsObj. Returns error message or null 
const apiRequest = async (url = '', optionsObj = null, errMsg = null) => {
    try {
        const response = await fetch(url, optionsObj)
        if(!response.ok) throw Error('Please reload the app');
    } catch (err) {
        errMsg = err.message;
    } finally {
        return errMsg; //either null or errMsg conent
    }
}

export default apiRequest;