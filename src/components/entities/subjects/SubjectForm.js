import Form from "../../UI/Form";
import "./SubjectForm.css";

const emptySubject = {
  name: "emptySubjectsubzero",
  image: "emptySubjectsubzero.png",
  level: 3,
  difficulty: "Hard",
};

export default function SubjectForm({
  onCancel,
  onSubmit,
  initialRecord = emptySubject,
}) {
  const validation = {
    isValid: {
      name: (name) => name.length > 8,
      image: (img) => img.length > 10,
      level: (level) => level > 0 && level < 4,
      difficulty: (difficulty) =>
        ["Easy", "Moderate", "Hard"].includes(difficulty),
    },
    errorMessage: {
      name: "Subject Name is too short",
      image: "Image URL is not valid",
      level: "Invalid level (should be between 1 and 3)",
      difficulty: "Difficulty must be Easy, Moderate, or Hard",
    },
  };

  const conformance = {
    js2html: {
      name: (name) => name,
      image: (img) => img,
      level: (level) => level,
      difficulty: (difficulty) => difficulty,
    },
    html2js: {
      name: (name) => name,
      image: (img) => img,
      level: (level) => parseInt(level),
      difficulty: (difficulty) => difficulty,
    },
  };

  const [subject, errors, handleChange, handleSubmit, handleCancel] =
    Form.useForm(initialRecord, conformance, validation, onCancel, onSubmit);

  return (
    <Form onSubmit={handleSubmit} onCancel={handleCancel}>
      <Form.Item
        label="name"
        htmlFor="name"
        advice="Please enter the name of the subject"
        error={errors.name}
      >
        <input
          type="text"
          name="name"
          value={conformance.js2html["name"](subject.name)}
          onChange={handleChange}
        />
      </Form.Item>

      <Form.Item
        label="level"
        htmlFor="level"
        advice="Choose the subject level between 1 and 3"
        error={errors.level}
      >
        <select
          name="level"
          value={conformance.js2html["level"](subject.level)}
          onChange={handleChange}
        >
          <option value="0" disabled>
            Select level
          </option>
          {[1, 2, 3].map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </Form.Item>

      <Form.Item
        label="difficulty"
        htmlFor="difficulty"
        advice="Choose the difficulty (Easy, Moderate, Hard)"
        error={errors.difficulty}
      >
        <select
          name="difficulty"
          value={conformance.js2html["difficulty"](subject.difficulty)}
          onChange={handleChange}
        >
          <option value="" disabled>
            Select difficulty
          </option>
          {["Easy", "Moderate", "Hard"].map((diff) => (
            <option key={diff} value={diff}>
              {diff}
            </option>
          ))}
        </select>
      </Form.Item>

      <Form.Item
        label="image"
        htmlFor="image"
        advice="Please enter the picture URL of the subject"
        error={errors.image}
      >
        <input
          type="text"
          name="image"
          value={conformance.js2html["image"](subject.image)}
          onChange={handleChange}
        />
      </Form.Item>
    </Form>
  );
}
