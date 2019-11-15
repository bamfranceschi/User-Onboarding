import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";

const LOTRForm = ({ values, errors, touched, status }) => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    status && setMembers(members => [...members, status]);
  }, [status]);

  return (
    <div>
      <Form>
        <Field type="text" name="name" placeholder="Full Name" />
        {touched.name && errors.name && <p>"You must tell us your name!"</p>}
        <Field type="email" name="email" placeholder="email" />
        {touched.email && errors.email && (
          <p>"We need your email, too." {errors.email}</p>
        )}
        <Field type="password" name="password" placeholder="password" />
        {touched.password && errors.password && (
          <p>"A password is definitely required." {errors.password}</p>
        )}

        <Field as="select" name="role">
          <option value="choose">Choose Your Role</option>
          <option value="wizard">Wizard</option>
          <option value="hobbit">Hobbit</option>
          <option value="elf">Elf</option>
          <option value="human">Human</option>
          <option value="orc">Orc</option>
        </Field>
        {touched.role && errors.role && (
          <p>"Sorry, you must choose your role"{errors.role}</p>
        )}
        <Field required type="checkbox" name="tos" checked={values.tos} />
        {touched.tos && errors.tos && (
          <p>"Sorry, you must agree to our Terms of Service!"{errors.tos}</p>
        )}
        <button as="button" type="submit">
          Submit
        </button>
      </Form>

      {members.map(member => (
        <ul key={member.id}>
          <li>Name: {member.name}</li>
          <li>Email: {member.email}</li>
        </ul>
      ))}
    </div>
  );
};

const FormikLOTRForm = withFormik({
  mapPropsToValues({ name, email, password, tos, role }) {
    return {
      name: name || "",
      email: email || "",
      password: password || "",
      tos: tos || false,
      role: role || ""
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required(),
    email: Yup.string().required(),
    password: Yup.string().required(),
    // tos: Yup.boolean().isValid(true)
    role: Yup.string().required()
  }),
  handleSubmit(values, { setStatus }) {
    //values is our object with all of our data on it
    axios
      .post("https://reqres.in/api/users/", values)
      .then(res => {
        setStatus(res.data);
        console.log(res.data);
      })
      .catch(err => {
        console.log(err.res);
      });
  }
})(LOTRForm);

export default FormikLOTRForm;
