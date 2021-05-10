import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";
import { Avatar, Badge } from "antd";
import {LoadingOutlined} from "@ant-design/icons";

const FileUpload = ({ values, setValues, loading, setLoading }, email) => {
  const { user } = useSelector((state) => ({ ...state }));

  const fileUploadAndResize = (e) => {
    //resize:
    let files = e.target.files;
    let allUploadedFiles = values.images;

    if (files) {
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            axios
              .post(
                `${process.env.REACT_APP_API}/uploadimages`,
                {
                  image: uri,
                },
                {
                  headers: {
                    authtoken: user ? user.token : "",
                    email,
                  },
                }
              )
              .then((res) => {
                setLoading(false);
                allUploadedFiles.push(res.data);
                setValues({ ...values, images: allUploadedFiles });
              })
              .catch((err) => {
                setLoading(false);
                console.log("Cloudinary upload Error");
              });
          },
          "base64"
        );
      }
    }
  };

  const handleImageRemove = (public_id) => {
    setLoading(true);
    axios
      .post(
        `${process.env.REACT_APP_API}/removeimage`,
        { public_id },
        {
          headers: { authtoken: user ? user.token : "", email },
        }
      )
      .then((res) => {
          setLoading(false);
          const {images} = values;
          let filteredImages = images.filter((item) => {
              return item.public_id !== public_id;
          });
          setValues({...values, image: filteredImages})
      })
      .catch((err) => {
          console.log(err);
          setLoading(false);
      });
  };

  return ( 
    <>
      <div className="row">
        {values.images &&
          values.images.map((image) => (
            loading ? <LoadingOutlined /> : <Badge
              count="X"
              key={image.public_id}
              style={{ cursor: "pointer" }}
              onClick={() => {
                handleImageRemove(image.public_id);
              }}
            >
              <Avatar
                src={image.url}
                size={100}
                shap="square"
                className="ml-3"
              />
            </Badge>
          ))}
      </div>
      <div className="row">
        <label className="btn btn-primary btn-raised">
          Choose File
          <input
            type="file"
            multiple
            hidden
            accept="images/*"
            onChange={fileUploadAndResize}
          />
        </label>
      </div>
    </>
  );
};

export default FileUpload;
