import Wrapper from "@/components/Wrapper";
import { Button } from "@mui/material";
import {  useState } from "react";
import styles from "../../styles/global.module.css";
import { UPLOAD_IMAGE } from "@/graphql/UserQueries";
import { useMutation } from "@apollo/client";

const UploadFile = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadFile, setUploadFile] = useState<any>([]);
  const [uploadImage] = useMutation(UPLOAD_IMAGE);


  // handle drag events
  const handleDrag = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      //   handleFile(e.dataTransfer.files);
      setUploadFile(e.dataTransfer.files);
    }
  };

  // triggers when file is selected with click
  const handleChange = (e: any) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      //   handleFile(e.target.files);
      setUploadFile(e.target.files);
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('object :>> ', uploadFile);
    uploadImage({
      variables: {
        file: uploadFile[0],
      },
    });
  };
  return (
    <Wrapper>
      <div className={styles.page}>
        <form
          className={styles.formfileupload}
          onDragEnter={handleDrag}
          onSubmit={handleSubmit}
        >
          <input
            type="file"
            className={styles.inputfileupload}
            multiple={true}
            onChange={handleChange}
          />
          <label
            htmlFor="input-file-upload"
            className={`${dragActive ? "drag-active" : ""} ${
              styles.labelfileupload
            }`}
          >
            <div>
              <p>Drag and drop your file here or</p>
              <p>File Name: {uploadFile[0]?.name}</p>
            </div>
          </label>
          {dragActive && (
            <div
              className={styles.dragfileelement}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            ></div>
          )}
          <button type="submit">Submit</button>
        </form>
      </div>
    </Wrapper>
  );
};
export default UploadFile;
