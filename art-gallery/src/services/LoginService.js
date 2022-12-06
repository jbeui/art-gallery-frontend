// Login
export async function Login(email, password) {
    // wipe previous DELETE after testing
    localStorage.setItem('token', null);
    localStorage.setItem('user', null);
    const request = {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({ email: email, password: password})
    }
    await fetch('/api/users/login/', request)
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('token', data.token);
            data.token = "";
            localStorage.setItem('user', JSON.stringify(data));
            return data
        })
        .catch(error => {
            if (error.response) {
                console.log("error")
            }
        })
}
