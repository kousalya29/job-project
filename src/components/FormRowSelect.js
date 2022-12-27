

const FormRowSelect = ({name,value,handleChange, labelText,list}) => {
  return (
   <div className="form-row">
          <label htmlFor={name} className="form-label">{labelText?labelText:name}</label>
          <select name={name} className="form-select" value={value} id={name} onChange={handleChange}>
            {list.map((itemValue, index)=>{
              return (
                <option value={itemValue} key={index}>{itemValue}</option>
              );
            })}
          </select>        
          </div>
  )
}
export default FormRowSelect
