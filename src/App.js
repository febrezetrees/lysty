import Header from './Header';
import AddItem from './AddItem';
import Content from './Content';
import Footer from './Footer';
import { useState } from "react";

function App() {
  const [items, setItems] = useState(JSON.parse(localStorage.getItem('shoppinglist')));
  const [newItem, setNewItem] = useState('');

  const setAndSaveItems = (newItems) => {
    setItems(newItems);
    localStorage.setItem('shoppinglist', JSON.stringify(newItems));
  }

  const addItem = (item) => {
    const id = items.length ? items[items.length-1].id + 1: 1; //sets id by adjusting the length counter (from 1)
    const myNewItem = { id, checked: false, item }; //new list item object
    const listItems = [...items, myNewItem]; //new list with spread operator
    setAndSaveItems(listItems);
  }

  const handleCheck = (id) => {
    const listItems = items.map((item) => item.id === id ? {...item, checked: !item.checked} : item);
    setAndSaveItems(listItems);
  }

  const handleDelete = (id) => {
    const listItems = items.filter((item) => item.id !== id);
    setAndSaveItems(listItems);
  }

  const handleSubmit = (e) => {
    e.preventDefault(); //stop default of reloading the page after submit
    if (!newItem) return; //if blank value/false, return/exit function
    addItem(newItem);
    setNewItem(''); //reset state of search bar after submitting back to nil
  }

  return (
    <div className="App">
      <Header title="Groceries"/>
      <AddItem 
        newItem ={newItem}
        setNewItem={setNewItem}
        handleSubmit={handleSubmit}
      />
      <Content 
          items={items}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
        />
      <Footer
        length={items.length}
      />
    </div>
  );
}

export default App;
