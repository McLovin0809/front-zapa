useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
        setUser(JSON.parse(userData));
    }
    setLoading(false);
}, []);

const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
};

const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
};