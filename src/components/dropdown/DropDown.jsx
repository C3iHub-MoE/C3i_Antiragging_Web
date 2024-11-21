
import { useState } from "react";
const Dropdown = ({ label, options, value, onChange }) => {
    const [searchTerm, setSearchTerm] = useState('');
  
    const filteredOptions = options.filter(option =>
      option.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    return (
      <div>
        <label>{label}</label>
        <input
          type="text"
          placeholder={`Search ${label}`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={value} onChange={(e) => onChange(e.target.value)}>
          <option value="">Select {label}</option>
          {filteredOptions.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    );
  };
export default Dropdown;