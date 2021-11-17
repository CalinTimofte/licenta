import React from 'react';
import Content from './Content';
import Chapters from './Chapters';
import SubChapters from './Subchapters';

export default function App(){
    return(
        <>
            <Chapters/>
            <SubChapters/>
            <Content/>
        </>
    )
}