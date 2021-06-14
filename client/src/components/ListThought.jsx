import React, { Fragment } from "react";

const ListThought = ({ thoughts }) => {
  return (
    <Fragment>
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            <th>Thought</th>
            <th>Submission Date</th>
          </tr>
        </thead>
        <tbody>
          {thoughts.map((thought) => (
            <tr key={thought.thought_id}>
              <td>{thought.thought_text}</td>
              <td>{thought.sent_date.split("T")[0]}</td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListThought;
