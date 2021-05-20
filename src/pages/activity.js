import { Formik, Form, useField } from 'Formik';
import * as Yup from 'Yup';

const TextInput = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input>. We can use field meta to show an error
    // message if the field is invalid and it has been touched (i.e. visited)
    const [field, meta] = useField(props);
    return (
      <>
        <label htmlFor={props.id || props.name}>{label}</label>
        <input className="text-input" {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </>
    );
  };

export default function SignupForm() {

    return (
        <Formik
            initialValues = {{
                title: '',
                description: '',
                date: '',
                location: '',
                number_of_people: ''
            }}
            validationSchema = {Yup.object({
                title: Yup.string()
                    .min(10, "O título deve ter entre 10 a 50 caráteres.")
                    .max(50, "O título deve ter entre 10 a 50 caráteres.")
                    .required("Obrigatório"),
                description: Yup.string()
                    .min(100, "A descrição deve conter no minímo 100 caráteres.")
                    .required("Obrigatório"),
                date: Yup.string()
                    .required("Obrigatório"),
                location: Yup.string()
                    .required("Obrigatório"),
                number_of_people: Yup.number("Não pode conter letras.")
                    .moreThan(0, "Uma atividade precisa de pelo menos uma pessoa.")
                    .typeError("Não pode conter letras.")
                    .required("Obrigatório"),
            })}
            onSubmit = // FUNCAO DO SUBMIT AQUI
            //--------------------------
            //--------------------------
            //TODO
            //--------------------------
            //--------------------------
                { values => {
                alert(JSON.stringify(values, null, 2));
            }
            }
        >

        <Form>

            <TextInput
                label="Titulo"
                name="title"
                type="text"
            />

            <TextInput
                label="Descrição"
                name="description"
                type="text"
            />

            <TextInput
                label="Data"
                name="date"
                type="datetime-local"
            />

            <TextInput
                label="Localização"
                name="location"
                type="text"
            />

            <TextInput
                label="Pessoas necessárias"
                name="number_of_people"
                type="text"
            />

            <p/>
            <button type="submit">Submit</button>

        </ Form>
    </ Formik>
    );   
}