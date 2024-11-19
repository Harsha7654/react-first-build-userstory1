import { useState } from "react";
import { Tray, Submit, Cancel } from "../../UI/Actions";
import FormItem from "../../UI/Form";
import "./SubjectForm.css";

const emptySubject = {
  SubjectName: "",
  SubjectImageURL: "",
  SubjectLecturerID: 0,
};

export default function SubjectForm({
  onDismiss,
  onSubmit,
  initialsubject = emptySubject,
}) {
  // Initialisation ------------------------------
  const isValid = {
    SubjectName: (name) => name.length > 8,
    SubjectImageURL: (img) => img.length > 10,
    SubjectLecturerID: (id) => id > 0 && id < 4,
  };

  const errorMessage = {
    SubjectName: "Subject Name is too short",
    SubjectImageURL: "Image URL is not valid",
    SubjectLecturerID: "Invalid ID",
  };
  // State ---------------------------------------
  const [subject, setSubject] = useState(initialsubject);
  const [errors, setErrors] = useState(
    Object.keys(initialsubject).reduce(
      (accum, key) => ({ ...accum, [key]: null }),
      {}
    )
  );
  // Handlers ------------------------------------
  const handleChange = (event) => {
    const { name, value } = event.target;
    const newValue = name === "SubjectLecturerID" ? parseInt(value) : value;
    setSubject({ ...subject, [name]: newValue });
    setErrors({
      ...errors,
      [name]: isValid[name](newValue) ? null : errorMessage[name],
    });
  };

  const isValidSubject = (subject) => {
    let isSubjectValid = true;
    Object.keys(subject).forEach((key) => {
      if (isValid[key](subject[key])) {
        errors[key] = null;
      } else {
        errors[key] = errorMessage[key];
        isSubjectValid = false;
      }
    });
    return isSubjectValid;
  };

  const handleCancel = () => onDismiss();
  const handleSubmit = (event) => {
    event.preventDefault();
    isValidSubject(subject) && onSubmit(subject) && onDismiss();
    setErrors({ ...errors });
  };
  // View ----------------------------------------
  return (
    <form className="BorderedForm">
      <FormItem
        label="Subject Name"
        htmlFor="SubjectName"
        advice="Please enter the name of the subject"
        error={errors.SubjectName}
      >
        <input
          type="text"
          name="SubjectName"
          value={subject.SubjectName}
          onChange={handleChange}
        />
      </FormItem>

      <FormItem
        label="Suject Image URL"
        htmlFor="SubjectImageURL"
        advice="Please enter the picture URL of the subject"
        error={errors.SubjectImageURL}
      >
        <input
          type="text"
          name="SubjectImageURL"
          value={subject.SubjectImageURL}
          onChange={handleChange}
        />
      </FormItem>

      <FormItem
        label="Suject Lecturer ID"
        htmlFor="SubjectLecturerID"
        advice="Choose the ID between 1 and 5 but choose 1"
        error={errors.SubjectLecturerID}
      >
        <select
          name="SubjectLecturerID"
          value={subject.SubjectLecturerID}
          onChange={handleChange}
        >
          <option value="0" disabled>
            Select lecturer ID 1
          </option>
          {[1, 2, 3, 4, 5, 6].map((id) => (
            <option key={id}>{id}</option>
          ))}
        </select>
      </FormItem>

      <Tray>
        <Submit
          showText
          onClick={handleSubmit}
          buttonText="Submit new subject"
        />
        <Cancel
          showText
          onClick={handleCancel}
          buttonText="Cancel submission"
        />
      </Tray>
    </form>
  );
}
