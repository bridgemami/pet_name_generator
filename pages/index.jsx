import Head from "next/head";
// import styles from '@/styles/Home.module.css'
import React, { useState } from "react";
import style from './index.module.css';
// import Image from "next/image";

export default function Home() {
  const [counter, setCounter] = useState(0);
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState("")
  const onSubmit = async (e) => {
    e.preventDefault();
    try{
    if (counter == 10) {
      return console.log("no more than 10");
    }
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({animal: animalInput})
    });
    const data = await response.json(
    )
    if (response.status !== 200) {
      throw data.error || new Error(`Request failed with status ${response.status}`);
    }
    setResult(data.result);
    setCounter(counter + 1);
    setAnimalInput('');
  }
  catch (e) {
  console.error(e)
  alert(e);

  }
  }
  return (
      <div className={style.body}>
        <Head>
          <title> Create Next App </title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={style.main}>
          <img src="/favicon.ico" alt="Duck icon" className={style.icon}  />
          <h1> Name My Pet </h1>
          <form onSubmit={onSubmit}>
            {/* <p> You Have used this app: {counter} </p> */}
            <label htmlFor="animal"></label>
            <input
              type="text"
              name="animal"
              placeholder="Enter an animal"
              value={animalInput}
              onChange={(e) => {setAnimalInput(e.target.value)
                console.log(animalInput)
              }}
            />
            <input
              type="submit"
              value='Generate names'
            />
          </form>
          <div className={style.result}>{result}</div>
        </main>
      </div>
  );
}
