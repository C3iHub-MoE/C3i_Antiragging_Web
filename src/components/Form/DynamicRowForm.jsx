import React from 'react';
import ButtonGroup from '../Button/ButtonGroup';
import { ICON } from '../../Utils/icons';

const DynamicRowForm = ({
  formSchema,
  formRows,
  handleInputChange,
  handleAddRow,
  handleDeleteRow,
  handleSubmit,
  isDisabled,
  buttons,
  ttlAmount
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        {formRows.map((row, rowIndex) => (
          <div key={rowIndex} style={{ marginBlock: '8px' }}>
            <div className="expense_form_container">
              {formSchema.map(field => (
                <div key={field.name} className="w-100">
                  <label>{field.label} <span className="required">*</span></label>
                  <input
                    title={field.label}
                    className='form-control'
                    name={field.name}
                    disabled={isDisabled}
                    type={field.type}
                    required
                    value={row[field.name]}
                    onChange={(event) => handleInputChange(rowIndex, event)}
                  />
                </div>
              ))}
              {rowIndex !== 0 && !isDisabled && (
                <button
                  aria-label="Delete Row"
                  disabled={isDisabled}
                  type='button'
                  className='report_row_cut'
                  onClick={() => handleDeleteRow(rowIndex)}
                >
                  {ICON.CLOSE}
                </button>
              )}
            </div>
          </div>
        ))}
        {!isDisabled && (<div className="d-flex justify-content-end">
          <span
            className='addRow text-success d-flex align-items-center'
            aria-label="Add More Rows"
            disabled={isDisabled}
            type='button'
            onClick={handleAddRow}
          >
            {ICON.PLUS}
            Add More
          </span>
        </div>
      )}
      </div>
      <h5 className='text-start mb-2 mt-3'>Total Amount: {ttlAmount}</h5>
      <ButtonGroup buttons={buttons} />
    </form>
  );
};

export default DynamicRowForm;
