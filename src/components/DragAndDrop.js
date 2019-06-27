import React, { useMemo, useState, useEffect } from "react";
import PropTypes from 'prop-types'
import { Icon } from "antd";
import { useDropzone } from "react-dropzone";
import uploadImageImg from "assets/images/upload-images.svg";

const DragAndDrop = props => {
  const { single, maxBytes, onChange, images } = props;
  const [files, setFiles] = useState(images);

  useEffect(() => {
    if (files.length > 0) {
      onChange(files);
    }
  }, [files]);

  const acceptMultipleImages = images =>
    files.concat(
      images.map(file =>
        Object.assign(file, {
          image: file,
          preview: URL.createObjectURL(file)
        })
      )
    );

  const acceptSingleImage = images => {
    console.log(URL.createObjectURL(images[0]));
    return [{ image: images[0], preview: URL.createObjectURL(images[0]) }];
  };
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: "image/*",
    multiple: !single,
    maxSize: maxBytes,
    onDrop: acceptedFiles => {
      if (acceptedFiles.length === 0) return;
      setFiles(
        single
          ? acceptSingleImage(acceptedFiles)
          : acceptMultipleImages(acceptedFiles)
      );
    }
  });

  let description = (
    <p style={descriptionStyle}>
      Drag and drop files here or <br />
      <span className="text-blue">select files</span>
    </p>
  );


  if (single) {
    baseStyle["width"] = 240;
    baseStyle["height"] = 240;
    baseStyle["objectFit"] = "contain";
    description = (
      <p style={descriptionStyle}>
        Drag and drop file here or <br />
        <span className="text-blue">choose file</span>
      </p>
    );
  }

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  const thumbs =
    !single &&
    files.map((file, index) => (
      <div style={thumb} key={file.name}>
        <Icon
          style={closeIcon}
          type="close-circle"
          onClick={() => {
            const newFiles = Object.assign([], files);
            newFiles.splice(index, 1);
            setFiles(newFiles);
          }}
        />
        <div style={thumbInner}>
          <img src={file.preview} style={img} alt="" />
        </div>
      </div>
    ));

  if (single) {
    return (
      <>
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          {files && files.length > 0 ? (
            <img src={files[0].preview} style={selectedImgStyle} alt="" />
          ) : (
            <>
              <img src={uploadImageImg} alt="" />
              {description}
            </>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <img src={uploadImageImg} alt="" />
        {description}
      </div>
      <aside style={thumbsContainer}>{thumbs}</aside>
    </>
  );
};

DragAndDrop.propTypes = {
  images: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  single: PropTypes.bool,
  onChange: PropTypes.func
}

DragAndDrop.defaultProps = {
  images: [],
  single: false,
  onChange: () => {}
}

const baseStyle = {
  position: "relative",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  paddingTop: "32px",
  paddingBottom: "16px",
  marginTop: 5,
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out"
};

const activeStyle = {
  borderColor: "#2196f3"
};

const acceptStyle = {
  borderColor: "#00e676"
};

const rejectStyle = {
  borderColor: "#ff1744"
};

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16
};

const thumb = {
  position: "relative",
  display: "inline-flex",
  borderRadius: 2,
  border: "1px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: "border-box"
};

const thumbInner = {
  display: "flex",
  minWidth: 0,
  overflow: "hidden"
};

const img = {
  display: "block",
  width: "auto",
  height: "100%"
};

const closeIcon = {
  position: "absolute",
  right: -8,
  top: -8,
  color: "red",
  backgroundColor: "white"
};

const descriptionStyle = {
  textAlign: "center",
  marginTop: 8
};

const selectedImgStyle = {
  position: "absolute",
  left: 0,
  top: 0,
  width: "100%",
  height: "100%",
  objectFit: "contain"
};

export default DragAndDrop;