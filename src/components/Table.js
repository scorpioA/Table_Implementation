import React, { useState } from "react";
import "../index.css";

const Table = () => {
  const [value, setValue] = useState([
    {
      ID: 1,
      mobileNumber: "",
      name: "",
      email: "",
      age: "",
    },
    {
      ID: 2,
      mobileNumber: "",
      name: "",
      email: "",
      age: "",
    },
    {
      ID: 3,
      mobileNumber: "",
      name: "",
      email: "",
      age: "",
    },
    {
      ID: 4,
      mobileNumber: "",
      name: "",
      email: "",
      age: "",
    },
  ]);

  const [toaster, setToaster] = useState("");

  const showToast = (message) => {
    setToaster(message);
    setTimeout(() => {
      setToaster("");
    }, 5000);
  };

  const handleCheckboxChange = (ID) => {
    setValue(
      value.map((item) =>
        item.ID === ID ? { ...item, selected: !item.selected } : item
      )
    );
  };

  const handleHeaderCheckboxChange = () => {
    const allSelected = value.every((item) => item.selected);
    setValue(value.map((item) => ({ ...item, selected: !allSelected })));
  };

  const handleDelete = (e) => {
    const newValue = value.filter((item) => !item.selected);
    setValue(newValue);
    showToast("Selected rows deleted");
  };

  const handleSave = (ID) => {
    setValue(
      value.map((item) => (item.ID === ID ? { ...item, editing: false } : item))
    );
    showToast("Changes are saved");
  };

  const handleEdit = (ID) => {
    setValue(
      value.map((item) =>
        item.ID === ID
          ? { ...item, editing: true }
          : { ...item, editing: false }
      )
    );
    showToast("Editing is under progress");
  };

  return (
    <>
      <div>
        <h1>Table implementation in React</h1>
        <h3>{toaster}</h3>
      </div>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={() => {
                    handleHeaderCheckboxChange();
                  }}
                />
              </th>
              <th>Mobile Number</th>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {value.map((item) => (
              <tr key={item.ID}>
                <td>
                  <input
                    type="checkbox"
                    checked={item.selected}
                    onChange={() => {
                      handleCheckboxChange(item.ID);
                    }}
                  />
                </td>
                <td>
                  {" "}
                  {item.editing ? (
                    <input
                      type="text"
                      value={item.mobileNumber}
                      onChange={(e) =>
                        setValue(
                          value.map((i) =>
                            i.ID === item.ID
                              ? { ...i, mobileNumber: e.target.value }
                              : i
                          )
                        )
                      }
                    />
                  ) : (
                    item.mobileNumber
                  )}
                </td>
                <td>
                  {item.editing ? (
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) =>
                        setValue(
                          value.map((i) =>
                            i.ID === item.ID
                              ? { ...i, name: e.target.value }
                              : i
                          )
                        )
                      }
                    />
                  ) : (
                    item.name
                  )}
                </td>
                <td>
                  {item.editing ? (
                    <input
                      type="text"
                      value={item.email}
                      onChange={(e) =>
                        setValue(
                          value.map((i) =>
                            i.ID === item.ID
                              ? { ...i, email: e.target.value }
                              : i
                          )
                        )
                      }
                    />
                  ) : (
                    item.email
                  )}
                </td>
                <td>
                  {item.editing ? (
                    <input
                      type="text"
                      value={item.age}
                      onChange={(e) =>
                        setValue(
                          value.map((i) =>
                            i.ID === item.ID ? { ...i, age: e.target.value } : i
                          )
                        )
                      }
                    />
                  ) : (
                    item.age
                  )}
                </td>
                <td>
                  {item.editing ? (
                    <button onClick={() => handleSave(item.ID)}>Save</button>
                  ) : (
                    <button onClick={() => handleEdit(item.ID)}>Add</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={(e) => handleDelete(e)}>Delete</button>
      </div>
    </>
  );
};

export default Table;
