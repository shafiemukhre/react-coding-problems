import { useState } from "react";

const defaultFormData = {
  name: "",
  email: "",
  message: "",
};

type ChangeEvent =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>;

export default function ContactForm() {
  const [formData, setFormData] = useState(defaultFormData);

  const onChange = (event: ChangeEvent) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert(JSON.stringify(formData, null, 2));
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" onChange={onChange} />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" onChange={onChange} />
      </div>
      <div>
        <label htmlFor="message">Message:</label>
        <textarea id="message" onChange={(e) => onChange(e)} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
