"use client";
import { useState } from "react";

export default function UserProfile() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("Male");

  const handleSave = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/userprofile/add-profile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, phone, gender }),
      });

      if (!response.ok) {
        alert("Failed to add profile");
        return;
      }

      alert("Profile added successfully!");
    } catch (err) {
      console.error("API Error:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="bg-blue-100 p-6 rounded-xl shadow-md w-[580px] max-w-2xl mx-auto h-[300px]">
      {/* User ID */}
      <div className="w-full flex justify-end ml-[25px]">
        <div className="font-semibold text-3xl text-gray-700 bg-white px-4 py-2 rounded -mt-6">
          FH54J7GV76B
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-start gap-6">
        {/* Left: Avatar */}
        <div className="flex flex-col items-center min-w-[110px] h-[200px] justify-start">
          <img
            src="/Avatar.png"
            alt="avatar"
            className="w-48 h-48 rounded-full border-4 border-white object-cover"
          />
          <button className="text-sm text-blue-700 mt-1 font-semibold">Change</button>
        </div>

        {/* Right: Form */}
        <div className="flex-1">
          <p className="text-xl font-bold text-blue-900 mb-4">Ankit K.</p>

          {/* Email Field */}
          <div className="flex items-center mb-3">
            <label className="w-20 text-sm font-semibold text-gray-700">Email:</label>
            <input
              type="email"
              placeholder="xyz@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 border rounded-lg text-sm w-[260px]"
            />
          </div>

          {/* Phone Field */}
          <div className="flex items-center mb-3">
            <label className="w-20 text-sm font-semibold text-gray-700">Phone:</label>
            <input
              type="tel"
              placeholder="9685746987"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="p-2 border rounded-lg text-sm w-[260px]"
            />
          </div>

          {/* Gender */}
          <div className="flex items-center mb-4">
            <span className="w-20 text-sm font-semibold text-gray-700">Gender:</span>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="Male"
                  checked={gender === "Male"}
                  onChange={() => setGender("Male")}
                />
                Male
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  value="Female"
                  checked={gender === "Female"}
                  onChange={() => setGender("Female")}
                />
                Female
              </label>
            </div>
          </div>

          {/* Save Button */}
          <div>
            <button
              onClick={handleSave}
              className="bg-yellow-400 hover:bg-yellow-300 text-black font-medium px-6 py-2 rounded-full mt-[80px] ml-[250px]"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}





// "use client";
// import { useState } from "react";

// export default function UserProfile() {
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [gender, setGender] = useState("Male");

//   const handleSave = async () => {
//     try {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/userprofile/update-profile`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ email, phone, gender }),
//       });

//       if (!response.ok) {
//         alert("Failed to update profile");
//         return;
//       }

//       alert("Profile updated successfully!");
//     } catch (err) {
//       console.error("API Error:", err);
//       alert("Something went wrong.");
//     }
//   };

//   return (
//     <div className="bg-blue-100 p-6 rounded-md shadow-md">
//       <div className="flex flex-col items-center">
//         <img
//           src="/Avatar.png"
//           alt="avatar"
//           className="w-24 h-24 rounded-full mb-4"
//         />
//         <p className="font-bold text-lg mb-4">Ankit K.</p>

//         <input
//           type="email"
//           placeholder="xyz@gmail.com"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="mb-2 p-2 w-full border rounded"
//         />

//         <input
//           type="tel"
//           placeholder="Phone Number"
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//           className="mb-2 p-2 w-full border rounded"
//         />

//         <div className="flex gap-6 mb-4">
//           <label className="flex items-center gap-2">
//             <input
//               type="radio"
//               value="Male"
//               checked={gender === "Male"}
//               onChange={() => setGender("Male")}
//             />
//             Male
//           </label>
//           <label className="flex items-center gap-2">
//             <input
//               type="radio"
//               value="Female"
//               checked={gender === "Female"}
//               onChange={() => setGender("Female")}
//             />
//             Female
//           </label>
//         </div>

//         <button
//           onClick={handleSave}
//           className="bg-yellow-400 hover:bg-yellow-300 text-black px-4 py-2 rounded"
//         >
//           Save
//         </button>
//       </div>
//     </div>
//   );
// }







// "use client";
// import { useState } from "react";

// export default function UserProfile() {
//   const [email, setEmail] = useState("");
//   const [phone, setPhone] = useState("");
//   const [gender, setGender] = useState("Male");

//   const handleSave = () => {
//     // TODO: Call API
//     console.log({ email, phone, gender });
//   };

//   return (
//     <div className="bg-blue-100 p-6 rounded-md">
//       <div className="flex flex-col items-center">
//         <img
//           src="/default-avatar.png"
//           alt="avatar"
//           className="w-24 h-24 rounded-full mb-4"
//         />
//         <p className="font-bold text-lg mb-2">Ankit K.</p>
//         <input
//           type="email"
//           placeholder="xyz@gmail.com"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="mb-2 p-2 w-full border rounded"
//         />
//         <input
//           type="text"
//           placeholder="Phone"
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//           className="mb-2 p-2 w-full border rounded"
//         />
//         <div className="flex gap-4 mb-4">
//           <label>
//             <input
//               type="radio"
//               value="Male"
//               checked={gender === "Male"}
//               onChange={() => setGender("Male")}
//             />
//             Male
//           </label>
//           <label>
//             <input
//               type="radio"
//               value="Female"
//               checked={gender === "Female"}
//               onChange={() => setGender("Female")}
//             />
//             Female
//           </label>
//         </div>
//         <button
//           onClick={handleSave}
//           className="bg-yellow-400 text-black px-4 py-2 rounded"
//         >
//           Save
//         </button>
//       </div>
//     </div>
//   );
// }
