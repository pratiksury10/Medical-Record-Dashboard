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

      <main className="max-w-6xl ml-[50px] mx-auto mt-8 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
          <div className="col-span-1">
            <UserProfile />
          </div>

          <div className="col-span-1 md:col-span-2 ml-[250px]">
            <FileUpload onUpload={handleUpload} />
          </div>

          {uploadedFiles.length > 0 && (
            <div className="col-span-1 md:col-span-3 mt-4">
              <h3 className="text-lg font-semibold mb-4">Uploaded Files</h3>
              <div className="flex flex-wrap gap-4 w-full">
                {uploadedFiles.map((file) => (
                  <div
                    key={file.id}
                    className="border border-gray-300 rounded-lg p-4 bg-white shadow-sm flex gap-4 items-start w-[500px]"
                    // className="border rounded p-4 flex gap-4 items-start w-full md:w-[48%] lg:w-[32%]"
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









// import UserProfile from '@/components/UserProfile';
// import FileUploadForm from '@/components/FileUpload';

// export default function Home() {
//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <h1 className="text-2xl font-bold text-center mb-6">Medical Record Dashboard</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Left: User Profile */}
//         <div className="bg-white p-4 rounded shadow">
//           <UserProfile />
//         </div>

//         {/* Right: File Upload */}
//         <div className="bg-white p-4 rounded shadow">
//           <FileUploadForm />
//         </div>
//       </div>
//     </div>
//   );
// }










// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={180}
//           height={38}
//           priority
//         />
//         <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
//           <li className="mb-2 tracking-[-.01em]">
//             Get started by editing{" "}
//             <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
//               app/page.tsx
//             </code>
//             .
//           </li>
//           <li className="tracking-[-.01em]">
//             Save and see your changes instantly.
//           </li>
//         </ol>

//         <div className="flex gap-4 items-center flex-col sm:flex-row">
//           <a
//             className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={20}
//               height={20}
//             />
//             Deploy now
//           </a>
//           <a
//             className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Read our docs
//           </a>
//         </div>
//       </main>
//       <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/file.svg"
//             alt="File icon"
//             width={16}
//             height={16}
//           />
//           Learn
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/window.svg"
//             alt="Window icon"
//             width={16}
//             height={16}
//           />
//           Examples
//         </a>
//         <a
//           className="flex items-center gap-2 hover:underline hover:underline-offset-4"
//           href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           <Image
//             aria-hidden
//             src="/globe.svg"
//             alt="Globe icon"
//             width={16}
//             height={16}
//           />
//           Go to nextjs.org →
//         </a>
//       </footer>
//     </div>
//   );
// }
