import { useState } from "react";

const AddContact = ({ onAddContact, onCancel }) => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");

  const handleSave = () => {
    if (!name || !surname || !phone) return;
    onAddContact({ name, surname, phone });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <button onClick={onCancel} className="text-xl text-gray-700">←</button>
        <h1 className="text-lg font-semibold">Add</h1>
        <button onClick={handleSave} className="text-xl text-blue-500">✔</button>
      </div>

      {/* Form */}
      <div className="flex flex-col p-4 space-y-6">
        <div>
          <label className="block text-gray-700 text-sm mb-2">Name</label>
          <input
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
};

export default AddContact;
