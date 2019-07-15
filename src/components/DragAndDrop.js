import React, { useContext, useMemo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Icon, Modal } from "antd";
import { useDropzone } from "react-dropzone";
import uploadImageImg from "assets/images/upload-images.svg";
import NewCampaignContext from 'contexts/NewCampaignContext';

const { confirm } = Modal;


const DragAndDrop = props => {
  const { single, small, maxBytes, onChange, images } = props;
  const [files, setFiles] = useState(images);
  const {deleteImg} = useContext(NewCampaignContext);

  useEffect(() => {
    if (images.length >= 0) {
      setFiles(images);
    }
  }, [images, onChange]);

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
      onChange(
        single
          ? acceptSingleImage(acceptedFiles)
          : acceptMultipleImages(acceptedFiles)
      );
    }
  });

  let description = (
    <p style={descriptionStyle}>
      Drag and drop files here or <br />
      <b className="text-blue">select files</b>
    </p>
  );


  if (single) {
    description = (
      <p style={descriptionStyle}>
        Drag and drop file here or <br />
        <b className="text-blue">choose file</b>
      </p>
    );
  }

  if(small) {
    baseStyle["width"] = 240;
    baseStyle["height"] = 240;
    baseStyle["objectFit"] = "contain";
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
    files.map((file, index) => {
      const isEditMode = typeof file !== "object";
      return (
        <div style={thumb} key={isEditMode ? index : file.name}>
          <Icon
            style={closeIcon}
            type="close-circle"
            onClick={() => {
              confirm({
                title: "Are you sure?",
                content: `You're about to delete an image. This action cannot be reverted.`,
                onOk() {
                  deleteImg(file, index, isEditMode);
                },
                onCancel() {}
              });
            }}
          />
          <div style={thumbInner}>
            <img src={isEditMode ? file : file.preview} style={img} alt="" />
          </div>
        </div>
      );
    });

  if (single) {
    const isEditMode = typeof files[0] !== "object"; 
    return (
      <>
        <div {...getRootProps({ style })}>
          <input {...getInputProps()} />
          {files && files.length > 0 ? (
            <img src={isEditMode ? files[0] : files[0].preview} style={selectedImgStyle} alt="" />
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
};

DragAndDrop.defaultProps = {
  images: [],
  single: false,
  small: false,
  onChange: () => {}
};

const baseStyle = {
  position: "relative",
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  paddingTop: "32px",
  minHeight: '200px',
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
  marginTop: 8,
  fontSize: 14
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
