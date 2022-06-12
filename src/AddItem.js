import { FaPlus } from "react-icons/fa";
import { useRef } from "react";

const AddItem = ({ newItem, setNewItem, handleSubmit }) => {
  
  const inputRef = useRef();
  
  return (
    <form className='addForm' onSubmit = {(e) => handleSubmit(e)}>
        <label htmlFor='addItem'>Add Item</label> 
        <input
            autoFocus
            ref={inputRef}
            id='addItem'
            type='text'
            placeholder='Add Item'
            required
            value={newItem} //links to current state, single source of truth
            onChange={(e) => setNewItem(e.target.value)} //Event listener onChange - updates state, single source of truth
        />
        <button
            type='submit'
            aria-label='Add item'
            onClick={() => inputRef.current.focus()} //when button clicked, will shift focus back to current 'ref' (e.g. input)
        >
            <FaPlus />
        </button>
    </form>
  )
}

export default AddItem