import React, { useState } from 'react';
import Router from 'next/router';
import 'bootstrap/dist/css/bootstrap.css';

const Draft: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      const body = { email, password };

      let response = await fetch('/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (response.status == 200)
      {
        await Router.push('/');
      }
      else
      {
        alert('Login inválido!');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="text-center">Login</h1>
          <form onSubmit={submitData}>
            <div className="form-group">
              <label>Email:</label>
              <input
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="form-control"
                type="email"
                value={email}
              />
            </div>
            <div className="form-group">
              <label className="password">Senha:</label>
              <input
                autoFocus
                className="form-control"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
                type="password"
                value={password}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block button">Entrar</button>
          </form>
        </div>
      </div>

      <style jsx>{`
      .button {
        margin-top:10px;
      }
      `}</style>
    </div>
  );
};

export default Draft;