import Header from './Header';
import SearchItem from './SearchItem'
import AddItem from './AddItem';
import Content from './Content';
import Footer from './Footer';
import { useState, useEffect } from "react";
import apiRequest from './apiRequest';

function App() {
  const API_URL = 'http://localhost:3500/items'; //API - sets the pathway as well, e.g. 'items'

  const [items, setItems] = useState([]); // source of state - the initial state we want to load with - with the intiial load via useEffect.
  const [newItem, setNewItem] = useState('');
  const [search, setSearch] = useState('');
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    //just loads at load time, once
    const fetchItems = async () => { //need async
      try {
        const response = await fetch(API_URL); //fetch call - performs READ (e.g.http GET) by default returning all JSON in 'db.json' as the 'response'
        if(!response.ok) throw new Error('Did not receive expected data'); //Look for API request error (.ok = 200-299 range). Throw is used to explicitly throw a defined exception. if response is not ok (within 200 range = OK status) will go to catch block
        const listItems = await response.json(); //converts json promise to a javascript object
        setItems(listItems);
        setFetchError(null); //if we had a successful request - reset to null (in case was previously an error on reload)
      } catch (err) {
        setFetchError(err.message); //if there is an error
      } finally {
        setisLoading(false); //sets to false after ewverythign has compelted in try catch
      }
    } 
    fetchItems(); //this is fine (Cf. immediately invoked function expression) as it does not return a value
  }, []) // [] array dependency - blank means it will only runs first render. Use this to load from API once (then can be managed in state)
  //If propos/state value are included in array dependence, 1) will run first render; and 2) any time dependency value changes

  const addItem = async (item) => {
    //State
    const id = items.length ? items[items.length-1].id + 1: 1; //sets id by adjusting the length counter (from 1)
    const myNewItem = { id, checked: false, item }; //new list item object. Item value is just the text / (e.g. e)
    const listItems = [...items, myNewItem]; //new list with spread operator
    setItems(listItems);

    //API
    const postOptions = {
      method: 'POST', //'create' in CRUD - - 'id' is auto-set on post via JSON-Server and is immutable.  Apended to main API URL.
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(myNewItem) //JSON of body posted
    }
    const result = await apiRequest(API_URL, postOptions); //all apiRequest() returns is the errMsg - either null or not
    if(result) setFetchError(result);
  }

  const handleCheck = async (id) => {
    //State
    const listItems = items.map((item) => item.id === id ? {...item, checked: !item.checked} : item);
    setItems(listItems);

    //API
    const myItem = listItems.filter((item) => item.id === id); //will find the item
    const updateOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({checked: myItem[0].checked}) // JSON of body (checked property change from filter), going to the body of ref id
    };
    const reqUrl = `${API_URL}/${id}`; //updating specific post using id
    const result = await apiRequest(reqUrl, updateOptions); //apiRequest made. Only returns an error or null
    if (result) setFetchError(result);
  }

  const handleDelete = async (id) => {
    //State
    const listItems = items.filter((item) => item.id !== id);
    setItems(listItems);

    //API
    const deleteOptions = { method: 'DELETE' };
    const reqUrl = `${API_URL}/${id}`;
    const result = await apiRequest(reqUrl, deleteOptions); //apiRequest made. Only returns an error or null
    if (result) setFetchError(result);
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
      <SearchItem
        search={search}
        setSearch={setSearch}
      />
      <main>
        {isLoading && <p>Loading items...</p>}
        {fetchError && <p style={{color: "red"}}>{`Error: ${fetchError}`}</p>} 
        {!fetchError && !isLoading && <Content //if no fetch error, and no longer loading, the Content component will show
            items={items.filter((item) => ((item.item).toLowerCase()).includes(search.toLowerCase()))} // using callbackFn - if true (via 'includes'), goes into array
            handleCheck={handleCheck}
            handleDelete={handleDelete}
        />}
      </main>
      <Footer
        length={items.length}
      />
    </div>
  );
}

export default App;
