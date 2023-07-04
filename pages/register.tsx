import React, { useState } from 'react';
import Layout from '../components/Layout';
import Router from 'next/router';
import 'bootstrap/dist/css/bootstrap.css';

const Draft: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    try {
      const body = { name, email, password };

      await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      await Router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="text-center">Registrar</h1>
          <form onSubmit={submitData}>
            <div className="form-group">
              <label>Nome:</label>
              <input
                autoFocus
                className="form-control"
                onChange={(e) => setName(e.target.value)}
                placeholder="Nome"
                type="text"
                value={name}
              />
            </div>
            <div className="form-group">
              <label>Email:</label>
              <input
                className="form-control"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                type="email"
                value={email}
              />
            </div>
            <div className="form-group">
              <label className="password">Senha:</label>
              <input
                className="form-control"
                autoFocus
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Senha"
                type="password"
                value={password}

              />
            </div>
            <button type="submit" className="btn btn-primary btn-block button">Cadastrar</button>
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