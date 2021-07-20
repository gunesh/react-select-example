import React, { useState } from 'react';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';

const options = [
  { value: 'chocolate1', label: 'Chocolate1', taxid: ['a', 'b', 'c'] },
  { value: 'chocolate', label: 'Chocolate', taxid: ['a1', 'b1', 'c1'] },
  { value: 'strawberry', label: 'Strawberry', taxid: ['a2', 'b2', 'c2'] },
  { value: 'vanilla', label: 'Vanilla', taxid: ['a3', 'b3', 'c3'] },
  { value: 'no-tax', label: 'No TaxID', taxid: [] }
];
const SelectTest = () => {
  const [msg, setMsg] = useState('There is no TaxID ');
  const [id, setId] = useState([]);
  const [value, setValue] = useState('');

  const onChangeTax = e => {
    setValue(e);
  };
  const onChange = a => {
    setValue(null);
    if (a.taxid.length > 0) {
      setMsg('');
      let tmp = [];
      a.taxid.map(i => {
        let b = {};
        b.value = i;
        b.label = i;
        tmp.push(b);
      });
      setId(tmp);
    } else {
      setMsg('There is no TaxID ');
      setId([{ value: 'no-taxid', label: 'There is no TaxID' }]);
    }
  };

  const promiseOptions = inputValue =>
    new Promise(resolve => {
      setTimeout(() => {
        resolve(options);
      }, 1000);
    });

  return (
    <div>
      <br />
      <br />
      <Select
        className="basic-single"
        classNamePrefix="select"
        // defaultValue={options[0]}
        // defaultInputValue="Please Select Org"
        isDisabled={false}
        isLoading={false}
        isClearable={true}
        isRtl={false}
        isSearchable={true}
        name="org"
        isMulti={false}
        options={options}
        onChange={onChange}
      />

      <br />
      <br />
      <Select
        className="basic-single"
        classNamePrefix="select"
        placeholder={id.length > 0 && msg ? msg : 'Please Select...'}
        // defaultValue={'value'}
        // defaultInputValue={value}
        isDisabled={msg === '' ? false : true}
        isLoading={false}
        isClearable={true}
        isRtl={false}
        isSearchable={true}
        name="taxid"
        isMulti={false}
        options={id}
        value={msg === '' ? value : null}
        onChange={e => {
          setValue(e);
          onChangeTax(e);
        }}
      />
      <br />
      <br />

      <AsyncSelect
        cacheOptions
        defaultOptions
        loadOptions={promiseOptions}
        isClearable={true}
        isSearchable={true}
      />
    </div>
  );
};
export default SelectTest;
