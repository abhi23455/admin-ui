import React, { useContext } from 'react'
import LabeledInput from '../Elements/LabeledInput'
import CheckBox from '../Elements/CheckBox'
import Button from '../Elements/Button'
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ThemeContext } from "../../context/themeContext";

const SignUpSchema = Yup.object().shape({
  fullname: Yup.string().required("Full name wajib diisi"),
  email: Yup.string().email("Email tidak valid").required("Email wajib diisi"),
  password: Yup.string().min(6, "Password minimal 6 karakter").required("Password wajib diisi"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password tidak sama")
    .required("Confirm password wajib diisi"),
  terms: Yup.boolean().oneOf([true], "Anda harus menyetujui Terms and Conditions"),
});

function FormSignUp({ onSubmit }) {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div>
        <div className="mt-5 mb-2 text-center">
            <h2 className={`text-1xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-01'}`}>Create an Account</h2>
        </div>
      {/* form start */}
      <div className="mt-16">
        <Formik
          initialValues={{
            fullname: "",
            email: "",
            password: "",
            confirmPassword: "",
            terms: false,
          }}
          validationSchema={SignUpSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await onSubmit(values);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              {/* FULL NAME */}
              <div className="mb-6">
                <Field name="fullname">
                  {({ field }) => (
                    <LabeledInput
                      {...field}
                      id="fullname"
                      type="text"
                      label="Full Name"
                      placeholder="Abhirama Maulana Putra"
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="fullname"
                  component="p"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* EMAIL */}
              <div className="mb-6">
                <Field name="email">
                  {({ field }) => (
                    <LabeledInput
                      {...field}
                      id="email"
                      type="email"
                      label="Email address"
                      placeholder="hello@example.com"
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* PASSWORD */}
              <div className="mb-6">
                <Field name="password">
                  {({ field }) => (
                    <LabeledInput
                      {...field}
                      id="password"
                      type="password"
                      label="Password"
                      placeholder="••••••••"
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* CONFIRM PASSWORD */}
              <div className="mb-6">
                <Field name="confirmPassword">
                  {({ field }) => (
                    <LabeledInput
                      {...field}
                      id="confirmPassword"
                      type="password"
                      label="Confirm Password"
                      placeholder="••••••••"
                    />
                  )}
                </Field>
                <ErrorMessage
                  name="confirmPassword"
                  component="p"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              {/* TERMS CHECKBOX */}
              <div className="mb-1 flex items-center gap-2">
                <Field name="terms">
                  {({ field }) => (
                    <CheckBox
                      {...field}
                      id="terms"
                      type="checkbox"
                      checked={field.value}
                      labelColor={isDarkMode ? "text-gray-300" : "text-gray-01"}
                    />
                  )}
                </Field>
                <label htmlFor="terms" className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-01'}`}>
                    I agree to the{" "}
                    <span className="text-primary font-bold">Terms and Conditions</span>
                </label>
              </div>
              <ErrorMessage
                name="terms"
                component="p"
                className="text-red-500 text-xs mt-1 mb-5"
              />

              {/* BUTTON */}
              <Button variant="primary">
                {isSubmitting ? "Loading..." : "SignUp"}
              </Button>
            </Form>
          )}
        </Formik>
      </div>
      {/* form end */}

      {/* link start */}
      <div className="flex justify-center mt-6">
        <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-03'}`}>
            Already have an account?{" "}
        <Link to="/login" className="text-primary text-sm font-bold cursor-pointer">
           Sign In Here
        </Link>
        </p>
      </div>
      {/* link end */}
    </div>
  )
}

export default FormSignUp
