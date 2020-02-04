async function index(req, res) {
    return res.send('Welcome to your first custom api route');
}

export default {
    '/': index
};