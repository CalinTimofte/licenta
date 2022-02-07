import React from 'react';

export const LocalStorageContext = React.createContext();

export function LocalStorageStore({children}){
  // Set up IndexedDB
  let db;
  let openRequest = indexedDB.open("uploadedFiles", 3);

  openRequest.onupgradeneeded = function (event) {
    // triggers if the client does not have a database
    // initialization
    db = event.target.result;
    let objectStore = db.createObjectStore("exerciseSolutions", { keyPath: "exerciseNumber" });
  };
  openRequest.onerror = function (event) {
    console.error("Error", event.target.errorCode);
  };
  openRequest.onsuccess = function (event) {
    db = event.target.result;
    // continue working with the database using the db object
    console.log("DB opened");
  };
  
  const storeSolution = (exerciseNumber, solutionFile) => {
    let transaction = db.transaction("exerciseSolutions", "readwrite");
    let exercises = transaction.objectStore("exerciseSolutions");
    let exercise = {
      exerciseNumber: exerciseNumber,
      solution: solutionFile,
      created: new Date()
    }
    let request = exercises.add(exercise);
    request.onsuccess = function(){
      console.log("Exercise added to the store", request.result);
    };
    request.onerror = function (){
      console.log("Error", request.error);
    }
  }
  const getSolutionByExerciseNumber = (exerciseNumber) => {}

  // Set local storage variables
  (() => {
    if(localStorage.getItem("activeChapter") === null)
        localStorage.setItem("activeChapter", "LP");
    if(localStorage.getItem("activeSubchapter") === null)
        localStorage.setItem("activeSubchapter", "Introduction");
    if(localStorage.getItem("activeSection") === null)
        localStorage.setItem("activeSection", "Introduction");
  })();

  const getStorageChapter = () => localStorage.getItem("activeChapter");
  const setStorageChapter = (chapter) => {localStorage.setItem("activeChapter", chapter);}

  const getStorageSubchapter = () => localStorage.getItem("activeSubchapter");
  const setStorageSubchapter = (subchapter) => {localStorage.setItem("activeSubchapter", subchapter);}

  const getStorageSection = () => localStorage.getItem("activeSection");
  const setStorageSection = (section) => {localStorage.setItem("activeSection", section);}

  return(
    <LocalStorageContext.Provider
      value = {{
        getStorageChapter,
        setStorageChapter,
        getStorageSubchapter,
        setStorageSubchapter,
        getStorageSection,
        setStorageSection
      }}
    >
      {children}
    </LocalStorageContext.Provider>
  )
}