import React, { createContext, useEffect, useMemo, useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
  measurementId: process.env.REACT_APP_MEASUREMENTIT,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const pokemonRef = collection(db, "Pokemon");
const categoriaRef = collection(db, "Categorias");

const FirebaseContexto = createContext();

const FirebaseProveedor = (props) => {

  const [pokemon, setPokemon] = useState([]);
  const [tipoPokemon, setTipoPokemon] = useState([]);


  useEffect(() => {
    const getPokemon = async () => {
      try {
        const dataPokemon = await getDocs(pokemonRef);
        const filterdata = dataPokemon.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setPokemon(filterdata);
      } catch (error) {
        console.log("Error al obtener los datos de los pokemons", error);
      }
    };
  
    const getTipoPokemon = async () => {
      try {
        const data = await getDocs(categoriaRef);
        const filterdata = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setTipoPokemon(filterdata);
      } catch (error) {
        console.log("Error al obtener los datos de los tipos de pokemons", error);
      }
    };
  
    getPokemon();
    getTipoPokemon();
  }, [pokemonRef, categoriaRef]);

  const datos = useMemo(() => {
    return {
      pokemon,
      tipoPokemon,
    };
  }, [pokemon, tipoPokemon]);

  return (
    <FirebaseContexto.Provider
      value={datos}
      {...props}
    ></FirebaseContexto.Provider>
  );
};

export { FirebaseContexto, FirebaseProveedor, categoriaRef, pokemonRef};
