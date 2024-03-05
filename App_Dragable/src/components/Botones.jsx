export function ButtonRed(props) {
   const { onClick, text } = props
  return (
     <div style={{backgroundColor:"red", borderRadius:"5px", width:"20%", color:"white"}}>
        <a onClick={onClick}>{text}</a>
     </div>
    
  );
}