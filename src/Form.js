import React from "react";

const Form = (props) => {
  const {
    newCurrency,
    setNewCurrency,
    newCode,
    setNewCode,
    newMid,
    setNewMid,
    newCountry,
    setNewCountry,
    handleSubmit,
  } = props;
  return (
    <div>
      <form onSubmit={handleSubmit}>
        waluta:{" "}
        <input
          type="text"
          value={newCurrency}
          onChange={(e) => setNewCurrency(e.target.value)}
        />
        kraj:{" "}
        <input
          type="text"
          value={newCountry}
          onChange={(e) => setNewCountry(e.target.value)}
        />
        symbol:{" "}
        <input
          type="text"
          value={newCode}
          onChange={(e) => setNewCode(e.target.value)}
        />
        wartość:{" "}
        <input
          type="number"
          value={newMid}
          onChange={(e) => setNewMid(e.target.value)}
        />
        <button type="submit">dodaj</button>
      </form>
    </div>
  );
};

export default Form;
