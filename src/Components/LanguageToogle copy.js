import React from "react";
// import { Dropdown } from "semantic-ui-react";
import { Dropdown } from 'react-bootstrap';

function LanguageToggle(props){

   const languageOptions = [
      { key: 'English', text: 'English', value: 'EN' },
      { key: 'French', text: 'Français', value: 'FR' },
      { key: 'German', text: 'Deutsch', value: 'DE' },
      { key: 'Spanish', text: 'Español', value: 'ES' },
      { key: 'Catalan', text: 'Català', value: 'CA' },
      { key: 'Chinese', text: '中文', value: 'CH' },
   ]

   const handleChange = (value) => {
      if (value === 'CH'){
         alert("Really?? You were expecting for Chinese??");
      } else {
         console.log(value);
         localStorage.setItem("language", value);
         const metaValue = "meta"+value;
         props.setLang(metaValue);
         props.setReloadData(true);
      }
   };
   return (
      <Dropdown>
         <Dropdown.Toggle
            variant="dark"
            id="dropdown-basic"
            className="navButton"
         >
            LANGUAGE!!
            {/* {props.select} */}
         </Dropdown.Toggle>

         <Dropdown.Menu>
            {languageOptions.map((language, index) =>
               <Dropdown.Item
                  key={index}
                  className="linkLanguageItem"
                  onClick={(value) => (
                     handleChange(language.value)
                  )}
               >
                  {language.text}
               </Dropdown.Item>
            )}
         </Dropdown.Menu>
      </Dropdown>
   );
}
export default LanguageToggle;