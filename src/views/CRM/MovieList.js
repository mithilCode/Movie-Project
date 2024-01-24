import React, { useCallback, useState } from 'react'
import View from './View';
import Grid from '@mui/material/Grid';
import { useFormik } from 'formik';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { setMovieListData } from '../../redux/reducers/movieList.slice';
const initialValues = {
  movieName: '',
  releaseDate: '',
  endDate: '',
  banner: '',
  desription: '',
}
const MovieList = () => {
  const dispatch = useDispatch()
  const { movieListData } = useSelector(
    ({ movieList }) => movieList
  );
  const [data, setData] = useState([]);
  const [checkedValues, setCheckedValues] = useState([]);
  const [checkedType, setCheckedType] = useState([]);
  const lang = [
    {
      key: 1,
      name: "English",
    },
    {
      key: 2,
      name: "Gujarati",
    },
    {
      key: 3,
      name: "Hindi",
    },
    {
      key: 4,
      name: "Punjabi",
    },
  ]
  const movieType = [
    {
      key: 1,
      type: "Drama",
    },
    {
      key: 2,
      type: "Thriller"
    },
    {
      key: 3,
      type: "Action"
    },
    {
      key: 4,
      type: "Comedy"
    },
    {
      key: 5,
      type: "Fantasy"
    },
    {
      key: 6,
      type: "Crime"
    },
    {
      key: 7,
      type: "Adventure"
    },
  ]

  const submitHandle = useCallback(
    async (values, { resetForm }) => {
      if (Object.values(values).every(value => value === '')) {
        alert("Please Fill Data")
      } else {
        const obj = {
          ...values,
          lang: checkedValues,
          type: checkedType
        }
        setData((prevData) => [...prevData, obj]);
        dispatch(setMovieListData([...data, obj]));
        resetForm();
        setCheckedValues([])
        setCheckedType([])
      }
    },
    [setData, checkedValues, checkedType, data, dispatch]
  );

  const { handleChange, values, handleSubmit } =
    useFormik({
      enableReinitialize: true,
      initialValues: initialValues,
      onSubmit: submitHandle,
    });

  const handleCheckboxChange = (type) => {
    if (checkedValues.includes(type)) {
      setCheckedValues(checkedValues.filter((lang) => lang !== type));
    } else {
      setCheckedValues([...checkedValues, type]);
    }
  }

  const handleType = (type) => {
    if (checkedType.includes(type)) {
      setCheckedType(checkedType.filter((types) => types !== type));
    } else {
      setCheckedType([...checkedType, type])
    }
  }

  const handelDelete = useCallback((index) => {
    const removeItem = data?.filter((item, i) => i !== index);
    setData(removeItem);
    dispatch(setMovieListData(removeItem));
  }, [data, dispatch])

  const handleEdit = useCallback((item) => {
    setCheckedValues(item?.lang)
    setCheckedType(item?.type)
  }, [])
  
  return (
    <View>
      <div className='movie_section'>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={3}>
              <div className='form_control'>
                <label htmlFor="movieName">Movie Name</label>
                <input type="text" placeholder='Movie Name' name='movieName' onChange={handleChange}
                  value={values.movieName} />
              </div>
            </Grid>
            <Grid item xs={3}>
              <div className='form_control'>
                <label htmlFor="releaseDate">Release Date</label>
                <input type="date" id='releaseDate' name='releaseDate' onChange={handleChange}
                  value={values.releaseDate} />
              </div>
            </Grid>
            <Grid item xs={3}>
              <div className='form_control'>
                <label htmlFor="endDate">End Date</label>
                <input type="date" id='endDate' name='endDate' onChange={handleChange}
                  value={values.endDate} />
              </div>
            </Grid>
            <Grid item xs={3}>
              <div className='form_control'>
                <label htmlFor="banner">Banner</label>
                <input type="file" id='banner' name='banner' onChange={handleChange} />
              </div>
            </Grid>
            <Grid item xs={3}>
              <div className='form_control'>
                <label htmlFor="">Language</label>
                <div className='chackbox_lang'>
                  {
                    lang?.map((item, index) => {
                      return (
                        <div className='chackbox_lang_content' key={index.toString()}>
                          <input type="checkbox" id={item?.name} checked={checkedValues.includes(item.name)}
                            onChange={() => handleCheckboxChange(item.name)} />
                          <label htmlFor={item?.name}>{item?.name}</label>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </Grid>
            <Grid item xs={3}>
              <div className='form_control'>
                <label htmlFor="">Movie Type</label>
                <div className='chackbox_lang'>
                  {
                    movieType?.map((item, index) => {
                      return (
                        <div className='chackbox_lang_content' key={index.toString()}>
                          <input type="checkbox" id={item?.type} checked={checkedType.includes(item.type)} onChange={() => handleType(item.type)} />
                          <label htmlFor={item?.type}>{item?.type}</label>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </Grid>
            <Grid item xs={9}>
              <div className='form_control'>
                <label htmlFor="desription">Description</label>
                <textarea placeholder='Description' id="" name='desription' onChange={handleChange}
                  value={values.desription}></textarea>
              </div>
            </Grid>
          </Grid>
          <button className='btn_add' type='submit'>Add</button>
        </form>
      </div>
      <div>
        <table className='content_table'>
          <thead>
            <tr>
              <th>Sr. No</th>
              <th>Movie Name</th>
              <th>Release Date</th>
              <th>End Date</th>
              <th>Banner</th>
              <th>Language</th>
              <th>Movie Type</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              movieListData?.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item?.movieName}</td>
                    <td>{item?.releaseDate ? moment(item?.releaseDate).format("DD-MM-YYYY") : null}</td>
                    <td>{item?.endDate ? moment(item?.endDate).format("DD-MM-YYYY") : null}</td>
                    <td>{item?.banner}</td>
                    <td>{item?.lang?.join(', ')}</td>
                    <td>{item?.type?.join(', ')}</td>
                    <td>{item?.desription}</td>
                    <td><button onClick={() => handleEdit(item)}>Edit</button><button onClick={() => handelDelete(index)}>Delete</button></td>
                  </tr>
                )
              })
            }

          </tbody>
        </table>
      </div>
    </View>
  )
}

export default MovieList