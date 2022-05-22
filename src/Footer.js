const Footer = ({ length }) => {
    const today = new Date();
    
    return (
    <footer>
        <p>&copy; MIT Licence {today.getFullYear()}</p>
        <p>Current total of {length} {length === 1 ? "item" : "items"}</p>
    </footer>
  )
}

export default Footer