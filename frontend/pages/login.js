import styles from '../styles/Home.module.css';
import { useEffect, useMemo, useState } from 'react';
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const modes = [ "Logar", "Criar usuário"];
  const [mode, setMode] = useState(modes[1]);
  const [userLogged, setUserLogged] = useState(null);
  const [isCreating, oppositeMode] = useMemo(() => {
    const isCreatingTemp = mode === modes[1];
    const oppositeModeTemp = isCreatingTemp ? modes[0] : modes[1];

    return [isCreatingTemp, oppositeModeTemp];
  })

  async function handleSubmit(e) {
    e.preventDefault();
    let route = "user-login";

    if(isCreating) {
      route = "users";
    }

    await axios.post(`http://localhost:5000/${route}`, {
      name: isCreating ? name : undefined, 
      password,
      email,
    })
    .then(({data}) => {
      if(isCreating) {
        setUserLogged(data);
        setMode(oppositeMode);
      }
    })
    .catch(console.error);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-bold mb-4 text-center">{mode}</h2>
      <div>
        <label className="block text-gray-700 dark:text-gray-300">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
        />
      </div>

      {
        mode === modes[1] && 
        <div>
          <label className="block text-gray-700 dark:text-gray-300">Nome</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
          />
        </div>
      } 
      <div>
        <label className="block text-gray-700 dark:text-gray-300">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
      >
        { mode }
      </button>
      <button
        type="button"
        onClick={() => setMode(oppositeMode)}
        className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
      >
        { oppositeMode }
      </button>
    </form>
  );
}