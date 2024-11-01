import React from 'react'

function LoginPage() { 
    const handleSubmit = () => {};

    const handleChange = () => {};
  return (
    <div className="login-form">
  <h2>Login</h2>
  <form onSubmit={handleSubmit}>
    <div className="form-group">
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        name="email"
        onChange={handleChange}
        required
      />
    </div>

    <div className="form-group">
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        name="password"
        onChange={handleChange}
        required
      />
    </div>

    <button type="submit">Login</button>
  </form>
</div>

  )
}

export default LoginPage