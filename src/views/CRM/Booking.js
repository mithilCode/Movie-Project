import React, { useEffect, useState } from 'react'
import View from './View';
import { useSelector, useDispatch } from 'react-redux';
import { loginAction } from '../../redux/reducers/auth.slice';
const Booking = () => {
  const [inputdata, setInputData] = useState({
    fname: '',
    lname: '',
    email: '',
    number: '',
    gender: '',
    liveindia: '',
    address: '',
    files: [],
    agree: false,
  });
  const [inputdataArray, setInputDataArray] = useState([]);
  const [editData, setEditData] = useState(-1);
  const [search, setSearch] = useState();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputdata.agree) {
      alert("Please Accept Policy");
      return;
    }
    if (editData === -1) {
      setInputDataArray((prevDataArray) => [...prevDataArray, inputdata]);
    } else {
      setInputDataArray((prevDataArray) => {
        const updatedArray = [...prevDataArray];
        updatedArray[editData] = inputdata;
        return updatedArray;
      })
    }
    setEditData(-1);
    setInputData({
      fname: '',
      lname: '',
      email: '',
      number: '',
      gender: '',
      liveindia: '',
      address: '',
      files: [],
      agree: false,
    })
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;
    setInputData({
      ...inputdata,
      [name]: value,
    })
  }
  const handelFile = (e) => {
    const files = Array.from(e.target.files);
    setInputData({
      ...inputdata,
      files,
    })

  }
  const onCancel = () => {
    setEditData(-1);
    setInputData({
      fname: '',
      lname: '',
      email: '',
      number: '',
      gender: '',
      liveindia: '',
      address: '',
      files: null,
      agree: false,
    })
  }
  const handleEdit = (index) => {
    const selectedItem = inputdataArray[index];
    setInputData(selectedItem);
    setEditData(index)
  }
  const handleDelete = (index) => {
    setInputDataArray((prevDataArray) => {
      const upDateArray = [...prevDataArray];
      upDateArray.splice(index, 1);
      return upDateArray;
    })
    setInputData({
      fname: '',
      lname: '',
      email: '',
      number: '',
      gender: '',
      liveindia: '',
      address: '',
      files: [],
      agree: false,
    })
  }
  return (
    <View>
      <section className="form_input">
        <div className="part_1">
          <h2>React Crud Opration</h2>
          <form className="input_set" onSubmit={handleSubmit}>
            <input type="text" placeholder="First Name" name="fname" value={inputdata.fname} onChange={handleChange} required />
            <input type="text" placeholder="Last Name" name="lname" value={inputdata.lname} onChange={handleChange} required />
            <input type="email" placeholder="Email" name="email" value={inputdata.email} onChange={handleChange} required />
            <input type="number" placeholder="Mobile Number" name="number" value={inputdata.number} onChange={handleChange} required />
            <select name="gender" value={inputdata.gender} onChange={handleChange} required>
              <option value="" defaultValue hidden>Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <div className="yes">
              <p> Are your live in India ?</p>
              <label className="radio_set" htmlFor="yes">
                <input type="radio" id="yes" name="liveindia" value="Yes" checked={inputdata.liveindia === "Yes"} onChange={handleChange} required />
                Yes
              </label>
              <label className="radio_set" htmlFor="no">
                <input type="radio" id="no" name="liveindia" value="No" checked={inputdata.liveindia === "No"} onChange={handleChange} required />
                No
              </label>
            </div>
            <input type="file" multiple onChange={handelFile} required />
            <textarea name="address" placeholder="Address" value={inputdata.address} onChange={handleChange} required></textarea>
            <div className="chackebox_set">
              <input type="checkbox" name="agree" checked={inputdata.agree} onChange={handleChange} id="agree" />
              <label htmlFor="agree">Accept Term & Agrement</label>
            </div>
            <button>{editData === -1 ? "Save" : "Edit"}</button>
          </form>
        </div>
        <div className="part_2">
          <input type="search" onChange={(e) => setSearch(e.target.value.trim())} placeholder='Search' />
          <div className='table_set'>
            <table border="2" className='content_table'>
              <thead>
                <tr>
                  <th>Sr. No.</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Number</th>
                  <th>Gender</th>
                  <th>Live in india</th>
                  <th>Address</th>
                  <th>Files</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {inputdataArray
                  ?.filter(item => item?.fname?.includes(search))?.map((tabelFields, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{tabelFields.fname}</td>
                      <td>{tabelFields.lname}</td>
                      <td>{tabelFields.email}</td>
                      <td>{tabelFields.number}</td>
                      <td>{tabelFields.gender}</td>
                      <td>{tabelFields.liveindia}</td>
                      <td>{tabelFields.address}</td>
                      <td className='table_img'> <img key={index} src={tabelFields.files && URL.createObjectURL(tabelFields.files[0])} alt='Img' /></td>
                      <td>{editData === -1 ? <button onClick={() => handleEdit(index)}>Edit</button> : <button onClick={onCancel}>Cancel</button>}<button onClick={() => handleDelete(index)}>Delete</button></td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </View>
  )
}

export default Booking