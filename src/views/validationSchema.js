import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    // date: Yup.string().matches(/^(1[89]|[2-9]\d)$/gm, 'Invalid Age')
    // match(/^(1[89]|[2-9]\d)$/gm),
});