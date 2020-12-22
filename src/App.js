import React, {useState} from "react";
// import {BrowserRouter} from 'react-router-dom';
// import logo from './logo.svg';
import AppBody from './Components/AppBody';

function App() {
  // Get Language from the browser
  function GetLanguageFromBrowser(input){
    const lang_set =["EN","FR","ES","CA","DE"];
    let lang = input;
    if (!input){
      lang = navigator.language.split("-")[0].toUpperCase();
    }
    if (!(lang_set.indexOf(lang) > -1)){
      lang = "EN";
    }
    return lang;
  }

  // Set initial Language
  function SetInitialLanguage(){
    let lang = false;
    if (localStorage.getItem('language')){
      lang = localStorage.getItem('language');
    }
    lang = GetLanguageFromBrowser(lang);

    lang = "meta"+lang;
    return lang;
  }

  const [lang, setLang] = useState(SetInitialLanguage());

  return (
    <div className="App">
      <AppBody 
        lang = {lang}
        setLang = {setLang}
      />
    </div>
  );
}

export default App;
