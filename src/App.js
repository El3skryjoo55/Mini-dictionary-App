import React, { useState } from 'react';
import './index.css';

function DictionaryApp() {
  const [word, setWord] = useState('');
  const [result, setResult] = useState(null);

  const searchWord = async () => {
    if (!word) return alert("Please enter a word!");
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      if (!response.ok) {
        throw new Error("Word not found");
      }
      const data = await response.json();
      setResult(data[0]);
    } catch (error) {
      setResult(null);
      alert(error.message);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      searchWord();
    }
  };

  return (
    <div className="app-container">
      <h1 className="header">Mini Dictionary</h1>
      <input 
        type="text" 
        className="input-field"
        placeholder="Enter a word..." 
        value={word} 
        onChange={(e) => setWord(e.target.value)} 
        onKeyDown={handleKeyDown}
      />
      <button className="search-button" onClick={searchWord}>Search</button>

      {result ? (
  <div className="result">
    <h2>Word: {result.word}</h2>
    {result.meanings && result.meanings.length > 0 ? (
      result.meanings.map((meaning, index) => (
        <div key={index} className="meaning">
          <h3>Part of Speech: {meaning.partOfSpeech}</h3>
          {meaning.definitions.map((def, idx) => (
            <p key={idx}>{def.definition}</p>
          ))}
        </div>
      ))
    ) : (
      <p>No meanings found for this word</p>
    )}
  </div>
) : (
  <p className="no-result">
    {result === null ? "Please enter a word to search" : "Word not found"}
  </p>
)}

      <footer className="footer">
        <p>&copy; Created by Youssef Fahmy <br /><mark> 2024 </mark></p>
      </footer>
    </div>
  );
}

export default DictionaryApp;
