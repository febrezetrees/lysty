import { FaPlus } from "react-icons/fa";

const AddItem = ({ newItem, setNewItem, handleSubmit }) => {
  return (
    <form className='addForm' onSubmit = {(e) => handleSubmit(e)}>
        <label htmlFor='addItem'>Add Item</label> 
        <input
            autoFocus
            id='addItem'
            type='text'
            placeholder='Add Item'
            required
            value={newItem} //links to current state, single source of truth
            onChange = {(e) => setNewItem(e.target.value)} //Event listener onChange - updates state, single source of truth
        />
        <button
            type='submit'
            aria-label='Add item'
        >
            <FaPlus />
        </button>
    </form>
  )
}

export default AddItem