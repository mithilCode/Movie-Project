import React, { useCallback, useEffect, useState } from 'react'
import View from '../CRM/View';
import { useFormik } from 'formik';
import { validationSchema } from '../validationSchema';
import dayjs from 'dayjs';
let userData = {
  email: '',
  user: '',
  date: '',
  remember_me: false,
};

const Dashboard = () => {
  const [age, setAge] = useState(0);
  const submitHandle = useCallback(async values => {
    console.log('values', values)
  }, [])
  const { handleBlur, handleChange, errors, values, touched, handleSubmit } =
    useFormik({
      enableReinitialize: true,
      initialValues: userData,
      validationSchema: validationSchema,
      onSubmit: submitHandle,
    });
  const birthdateObj = dayjs(values?.date);
  const currentDate = dayjs();
  const ageFunction = useCallback(() => {
    const years = currentDate.diff(birthdateObj, 'year');
    const remainingWeeks = currentDate.diff(birthdateObj.add(years, 'year'), 'week');
    const days = currentDate.diff(birthdateObj.add(years, 'year').add(remainingWeeks, 'week'), 'day');
    setAge(years + " Year " + remainingWeeks + " Weeks " + days + " Day")
  }, [birthdateObj, currentDate])
  useEffect(() => {
    if (values?.date) {
      ageFunction()
    }
    return () => {
      setAge(0)
    }
  }, [ageFunction, values?.date])
  return (
    <View>
      <div>
        <form onSubmit={handleSubmit} noValidate>
          <div className='form_control'>
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={handleChange}
              value={values?.email}
              onBlur={handleBlur}
              required
            />
          </div>
          {touched?.email && errors?.email && (
            <p className="text-danger">{errors?.email}</p>
          )}
          <div className='form_control'>
            <label htmlFor="email">User</label>
            <input
              id="user"
              name="user"
              type="text"
              onChange={handleChange}
              value={values?.user}
              onBlur={handleBlur}
              required
            />
          </div>
          <div className='form_control'>
            <label htmlFor="email">User</label>
            <input
              id="date"
              name="date"
              type="date"
              onChange={handleChange}
              value={values?.date}
              onBlur={handleBlur}
              required
            />
          </div>
          <div className='form_control'>
            <label htmlFor="email">Age</label>
            <input
              id="age"
              name="age"
              type="text"
              value={age}
              disabled
            />
          </div>
          {/* {touched?.date && errors?.date && (
            <p className="text-danger">{errors?.date}</p>
          )} */}
          <button type="submit">Submit</button>
        </form>
      </div>
    </View>
  )
}

export default Dashboard