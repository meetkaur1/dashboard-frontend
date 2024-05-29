import { useState } from "react";

export const FileUpload = () => {
  const [image, setimage] = useState("");
  // not used - for image upload through image
  return (
    <>
      <img
        style={{
          width: "400px",
          height: "00px",
          borderRadius: "50%",
          border: "4px solid green",
          objectFit: "cover",
        }}
        src={""}
        alt="img"
      />
      <input
        type="file"
        accept="/image/*"
        onChange={(event) => {
          const file = event.target.files[0];
          if (file && file.type.substring(0, 5) === "image") {
            setimage(file);
          }
        }}
      ></input>
    </>
  );
};
