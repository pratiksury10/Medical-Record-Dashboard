// "use client";
// import { useState } from "react";
// import UserProfile from "@/components/UserProfile";
// import FileUpload from "@/components/FileUpload";
// import Header from "@/components/Header";

// export default function Dashboard() {
//   const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);

//   const handleUpload = (file: any) => {
//     setUploadedFiles((prev) => [...prev, file]);
//   };

//   const handleDelete = async (id: number) => {
//     try {
//       const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/files/${id}`, {
//         method: "DELETE",
//         credentials: "include",
//       });

//       if (res.ok) {
//         setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
//       } else {
//         console.error("Failed to delete file");
//       }
//     } catch (err) {
//       console.error("Error deleting file", err);
//     }
//   };

//   const renderFilePreview = (filePath: string) => {
//     const isImage = /\.(jpg|jpeg|png|gif)$/i.test(filePath);
//     const isPDF = /\.pdf$/i.test(filePath);

//     if (isImage) {
//       return (
//         <img
//           src={`${process.env.NEXT_PUBLIC_API_URL}${filePath}`}
//           alt="Uploaded"
//           className="h-32 w-auto object-cover rounded"
//         />
//       );
//     }

//     if (isPDF) {
//       return <img src="/pdf-icon.png" alt="PDF Icon" className="h-16 w-16" />;
//     }

//     return <span className="text-sm text-gray-500">Unsupported format</span>;
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Header />

//       <main className="max-w-6xl mx-auto mt-8 p-4">
//         {/* Two-column grid for profile + upload */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="col-span-1">
//             <UserProfile />
//           </div>
//           <div className="col-span-1 md:col-span-2">
//             <FileUpload onUpload={handleUpload} />
//           </div>
//         </div>

//         {/* Full-width Uploaded Files section BELOW both */}
//         {uploadedFiles.length > 0 && (
//           <div className="mt-10 w-full">
//             <h3 className="text-xl font-semibold mb-4">Uploaded Files</h3>
//             <div className="flex flex-wrap gap-4 w-full">
//               {uploadedFiles.map((file) => (
//                 <div
//                   key={file.id}
//                   className="border rounded p-4 flex gap-4 items-start w-full md:w-[48%] lg:w-[32%]"
//                 >
//                   {renderFilePreview(file.filePath)}
//                   <div>
//                     <p className="font-medium">{file.fileName}</p>
//                     <p className="text-sm text-gray-600">{file.fileType}</p>
//                     <div className="flex gap-4 mt-2">
//                       <a
//                         href={`${process.env.NEXT_PUBLIC_API_URL}${file.filePath}`}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-blue-600 underline"
//                       >
//                         View
//                       </a>
//                       <button
//                         onClick={() => handleDelete(file.id)}
//                         className="text-red-600 hover:underline"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }












// import UserProfile from "@/components/UserProfile";
// import FileUpload from "@/components/FileUpload";
// import Header from "@/components/Header";

// export default function Dashboard() {
//     return (
//     <div className="min-h-screen bg-gray-100">
//       <Header />

//       <main className="max-w-6xl mx-auto mt-8 p-4">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//           <div className="col-span-1">
//             <UserProfile />
//           </div>
//           <div className="col-span-1 md:col-span-2">
//             <FileUpload />
//           </div>

          
//         </div>
//       </main>
//     </div>
//   // return (
//   //   <div className="max-w-6xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
//   //     <div className="flex flex-col md:flex-row gap-6">
//   //       <div className="md:w-1/3">
//   //         <UserProfile />
//   //       </div>
//   //       <div className="md:w-2/3">
//   //         <FileUpload />
//   //       </div>
//   //     </div>
//   //   </div>
//   );
// }




'use client';

import { useState } from 'react';
import UserProfile from "@/components/UserProfile";
import FileUpload from '@/components/FileUpload';
import Header from "@/components/Header";

export default function Dashboard() {
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);

  const handleUpload = (newFile: any) => {
    setUploadedFiles((prev) => [...prev, newFile]);
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/files/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (res.ok) {
        setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
      } else {
        console.error('Failed to delete file');
      }
    } catch (err) {
      console.error('Error deleting file', err);
    }
  };

  const renderFilePreview = (filePath: string) => {
    const isImage = /\.(jpg|jpeg|png|gif)$/i.test(filePath);
    const isPDF = /\.pdf$/i.test(filePath);

    if (isImage) {
      return (
        <img
          src={`${process.env.NEXT_PUBLIC_API_URL}${filePath}`}
          alt="Uploaded"
          className="h-32 w-auto object-cover rounded"
        />
      );
    }

    if (isPDF) {
      return <img src="/pdf-icon.png" alt="PDF Icon" className="h-16 w-16" />;
    }

    return <span className="text-sm text-gray-500">Unsupported format</span>;
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="max-w-6xl mx-auto mt-8 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1">
            <UserProfile />
          </div>

          <div className="col-span-1 md:col-span-2">
            console.log("Rendering FileUpload. handleUpload is:", handleUpload);
            <FileUpload onUpload={handleUpload} />
          </div>

          {uploadedFiles.length > 0 && (
            <div className="col-span-1 md:col-span-3 mt-4">
              <h3 className="text-lg font-semibold mb-4">Uploaded Files</h3>
              <div className="flex flex-wrap gap-4 w-full">
                {uploadedFiles.map((file) => (
                  <div
                    key={file.id}
                    className="border rounded p-4 flex gap-4 items-start w-full md:w-[48%] lg:w-[32%]"
                  >
                    {renderFilePreview(file.filePath)}
                    <div>
                      <p className="font-medium">{file.fileName}</p>
                      <p className="text-sm text-gray-600">{file.fileType}</p>
                      <div className="flex gap-4 mt-2">
                        <a
                          href={`${process.env.NEXT_PUBLIC_API_URL}${file.filePath}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          View
                        </a>
                        <button
                          onClick={() => handleDelete(file.id)}
                          className="text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
