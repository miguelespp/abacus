import Api from "@/services/Api";
import React from "react";

type PublisherRequest = {
  name: string;
};

const PublisherForm = () => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data: PublisherRequest = {
      name: event.target.name.value,
    };
    try {
      const response = await Api.post("/dashboard/publishers", data);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input type="text" name="name" />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default PublisherForm;
