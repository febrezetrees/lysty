import React from "react";
import {useState} from "react";

const Content = () => {
    const [items, setItems] = useState([
        {
            id: 1,
            checked: false,
            item: "One half point bag of Cadbury"
        },
        {
            id: 2,
            checked: false,
            item: "Item 2"
        },
        {
            id: 3,
            checked: false,
            item: "Item 3"
        }
    ]);
 
    return (
        <main>
            
        </main>
  )
}

export default Content