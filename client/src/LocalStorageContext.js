import React from 'react';

export const LocalStorageContext = React.createContext();

export function LocalStorageStore({children}){
  // Set local storage variables init value
  (() => {
    if(localStorage.getItem("activeChapter") === null)
        localStorage.setItem("activeChapter", "LP");
    if(localStorage.getItem("activeSubchapter") === null)
        localStorage.setItem("activeSubchapter", "Introduction");
    if(localStorage.getItem("activeSection") === null)
        localStorage.setItem("activeSection", "Introduction");
  })();

  // State hooks
  const getStorageChapter = () => localStorage.getItem("activeChapter");
  const setStorageChapter = (chapter) => {localStorage.setItem("activeChapter", chapter);}

  const getStorageSubchapter = () => localStorage.getItem("activeSubchapter");
  const setStorageSubchapter = (subchapter) => {localStorage.setItem("activeSubchapter", subchapter);}

  const getStorageSection = () => localStorage.getItem("activeSection");
  const setStorageSection = (section) => {localStorage.setItem("activeSection", section);}

  // User data interaction
  const getUserData = () => JSON.parse(localStorage.getItem("userData"));
  const setUserData = (data) => {localStorage.setItem("userData", JSON.stringify(data));}
  

  return(
    <LocalStorageContext.Provider
      value = {{
        getStorageChapter,
        setStorageChapter,
        getStorageSubchapter,
        setStorageSubchapter,
        getStorageSection,
        setStorageSection,
        getUserData,
        setUserData
      }}
    >
      {children}
    </LocalStorageContext.Provider>
  )
}